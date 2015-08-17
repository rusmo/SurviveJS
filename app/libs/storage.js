/**
 * Created by Will on 8/13/2015.
 */
export default {
    get: function(k) {
        try {
            return JSON.parse(localStorage.getItem(k));
        }
        catch(ex) {
            return null;
        }
    },
    set: function(k, v) {
        localStorage.setItem(k, JSON.stringify(v));
    }
};