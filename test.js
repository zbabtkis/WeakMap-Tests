var withWeakMap = function() {
    "use strict";

    var pics = new WeakMap()
      , user;
    
    return {
        login: function(id, pass) {
            /** 
             * Since this is declared inside the login scope, it's direct reference
             * will fall out of use once function returns.
             */
			var obj = [];
			for(var i = 0; i < 999999; i++) {
				obj.push(i);
			}
            
            // Global user, which can be used outside of login scope.
            user = {name: "EarthMan", id: 1};
            
            // Create weak reference to image.
            pics.set(user, obj);
        },
    
        logout: function() {
            // Allow user and user favs to be garbage collected.
            user = undefined;
        },

		getPicByUser: function(u) {
			pics.get(u);
	 	}
	};
};
        
var withoutWeakMap = function() {
    "use strict";
    
    var pics = {}
      , user;
    
    return {
        login: function(id, pass) {
            /** 
             * Since this is declared inside the login scope, it's direct reference
             * will fall out of use once function returns.
             */
			var obj = [];
			for(var i = 0; i < 999999; i++) {
				obj.push(i);
			}
            
            // Global user, which can be used outside of login scope.
            user = {name: "EarthMan", id: 1};
            
            // Strong reference to image from user.id
            pics[user.id] = obj;
        },
        
        logout: function(id, pass) {
            // The following line would remove the strong refernece,
            // but I've commented it out to show how it will stay in memory
            // once user is removed.
            // favs[user.id] = undefined;
            user = undefined;
        },

		getPicById: function(id) {
			return pics[id];
		}
    };
};
