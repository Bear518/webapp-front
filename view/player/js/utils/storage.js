define([
    'utils/underscore',
    'utils/helpers'
], function(_, utils) {

    var storage = {
        removeItem: utils.noop
    };

    try {
        storage = window.localStorage;
    } catch(e) {/* ignore */}

    function jsPrefix(str) {
        return 'jsplayer.' + str;
    }

    function getAllItems() {
        return _.reduce(this.persistItems, function(memo, key) {
            var val = storage[jsPrefix(key)];
            if (val) {
                memo[key] = utils.serialize(val);
            }
            return memo;
        }, {});
    }

    function setItem(name, value) {
        try {
            storage[jsPrefix(name)] = value||0;
        } catch(e) {
            // ignore QuotaExceededError unless debugging
            var jsplayer = window.jsplayer;
            if (jsplayer && jsplayer.debug) {
                console.error(e);
            }
        }
    }
    function getItem(key) {
        var val = storage[jsPrefix(key)];
        if (val) {
            val = utils.serialize(val);
        }
        return val;
    }
    function clear() {
        _.each(this.persistItems, function(val) {
            storage.removeItem(jsPrefix(val));
        });
    }

    function Storage() {
        this.persistItems = [
            'volume',
            'mute',
            // 'captionLabel',
            'qualityLabel',
            'providerType'
        ];
    }

    function track(model) {
        _.each(this.persistItems, function(item) {
            model.on('change:' + item, function(model, value) {
                setItem(item, value);
            });
        });
    }

    _.extend(Storage.prototype, {
        getAllItems: getAllItems,
        track : track,
        clear: clear,
        setItem:setItem,
        getItem:getItem
    });

    return Storage;
});