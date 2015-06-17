(function(console, $hx_exports) {
    "use strict";

    function $extend(from, fields) {
        function Inherit() {}
        Inherit.prototype = from;
        var proto = new Inherit();
        for (var name in fields) proto[name] = fields[name];
        if (fields.toString !== Object.prototype.toString) proto.toString = fields.toString;
        return proto;
    }
    var HxOverrides = function() {};
    HxOverrides.__name__ = true;
    HxOverrides.indexOf = function(a, obj, i) {
        var len = a.length;
        if (i < 0) {
            i += len;
            if (i < 0) i = 0;
        }
        while (i < len) {
            if (a[i] === obj) return i;
            i++;
        }
        return -1;
    };
    HxOverrides.remove = function(a, obj) {
        var i = HxOverrides.indexOf(a, obj, 0);
        if (i == -1) return false;
        a.splice(i, 1);
        return true;
    };
    HxOverrides.iter = function(a) {
        return {
            cur: 0,
            arr: a,
            hasNext: function() {
                return this.cur < this.arr.length;
            },
            next: function() {
                return this.arr[this.cur++];
            }
        };
    };
    var Lambda = function() {};
    Lambda.__name__ = true;
    Lambda.has = function(it, elt) {
        var $it0 = $iterator(it)();
        while ($it0.hasNext()) {
            var x = $it0.next();
            if (x == elt) return true;
        }
        return false;
    };
    var List = function() {
        this.length = 0;
    };
    List.__name__ = true;
    List.prototype = {
        add: function(item) {
            var x = [item];
            if (this.h == null) this.h = x;
            else this.q[1] = x;
            this.q = x;
            this.length++;
        },
        clear: function() {
            this.h = null;
            this.q = null;
            this.length = 0;
        },
        remove: function(v) {
            var prev = null;
            var l = this.h;
            while (l != null) {
                if (l[0] == v) {
                    if (prev == null) this.h = l[1];
                    else prev[1] = l[1];
                    if (this.q == l) this.q = prev;
                    this.length--;
                    return true;
                }
                prev = l;
                l = l[1];
            }
            return false;
        },
        iterator: function() {
            return new _$List_ListIterator(this.h);
        },
        __class__: List
    };
    var _$List_ListIterator = function(head) {
        this.head = head;
        this.val = null;
    };
    _$List_ListIterator.__name__ = true;
    _$List_ListIterator.prototype = {
        hasNext: function() {
            return this.head != null;
        },
        next: function() {
            this.val = this.head[0];
            this.head = this.head[1];
            return this.val;
        },
        __class__: _$List_ListIterator
    };
    Math.__name__ = true;
    var Std = function() {};
    Std.__name__ = true;
    Std["is"] = function(v, t) {
        return js_Boot.__instanceof(v, t);
    };
    Std.string = function(s) {
        return js_Boot.__string_rec(s, "");
    };
    var haxe_IMap = function() {};
    haxe_IMap.__name__ = true;
    haxe_IMap.prototype = {
        __class__: haxe_IMap
    };
    var haxe_ds__$StringMap_StringMapIterator = function(map, keys) {
        this.map = map;
        this.keys = keys;
        this.index = 0;
        this.count = keys.length;
    };
    haxe_ds__$StringMap_StringMapIterator.__name__ = true;
    haxe_ds__$StringMap_StringMapIterator.prototype = {
        hasNext: function() {
            return this.index < this.count;
        },
        next: function() {
            return this.map.get(this.keys[this.index++]);
        },
        __class__: haxe_ds__$StringMap_StringMapIterator
    };
    var haxe_ds_StringMap = function() {
        this.h = {};
    };
    haxe_ds_StringMap.__name__ = true;
    haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
    haxe_ds_StringMap.prototype = {
        set: function(key, value) {
            if (__map_reserved[key] != null) this.setReserved(key, value);
            else this.h[key] = value;
        },
        get: function(key) {
            if (__map_reserved[key] != null) return this.getReserved(key);
            return this.h[key];
        },
        setReserved: function(key, value) {
            if (this.rh == null) this.rh = {};
            this.rh["$" + key] = value;
        },
        getReserved: function(key) {
            if (this.rh == null) return null;
            else return this.rh["$" + key];
        },
        remove: function(key) {
            if (__map_reserved[key] != null) {
                key = "$" + key;
                if (this.rh == null || !this.rh.hasOwnProperty(key)) return false;
                delete(this.rh[key]);
                return true;
            } else {
                if (!this.h.hasOwnProperty(key)) return false;
                delete(this.h[key]);
                return true;
            }
        },
        arrayKeys: function() {
            var out = [];
            for (var key in this.h) {
                if (this.h.hasOwnProperty(key)) out.push(key);
            }
            if (this.rh != null) {
                for (var key in this.rh) {
                    if (key.charCodeAt(0) == 36) out.push(key.substr(1));
                }
            }
            return out;
        },
        iterator: function() {
            return new haxe_ds__$StringMap_StringMapIterator(this, this.arrayKeys());
        },
        __class__: haxe_ds_StringMap
    };
    var js__$Boot_HaxeError = function(val) {
        Error.call(this);
        this.val = val;
        this.message = String(val);
        if (Error.captureStackTrace) Error.captureStackTrace(this, js__$Boot_HaxeError);
    };
    js__$Boot_HaxeError.__name__ = true;
    js__$Boot_HaxeError.__super__ = Error;
    js__$Boot_HaxeError.prototype = $extend(Error.prototype, {
        __class__: js__$Boot_HaxeError
    });
    var js_Boot = function() {};
    js_Boot.__name__ = true;
    js_Boot.getClass = function(o) {
        if ((o instanceof Array) && o.__enum__ == null) return Array;
        else {
            var cl = o.__class__;
            if (cl != null) return cl;
            var name = js_Boot.__nativeClassName(o);
            if (name != null) return js_Boot.__resolveNativeClass(name);
            return null;
        }
    };
    js_Boot.__string_rec = function(o, s) {
        if (o == null) return "null";
        if (s.length >= 5) return "<...>";
        var t = typeof(o);
        if (t == "function" && (o.__name__ || o.__ename__)) t = "object";
        switch (t) {
            case "object":
                if (o instanceof Array) {
                    if (o.__enum__) {
                        if (o.length == 2) return o[0];
                        var str2 = o[0] + "(";
                        s += "\t";
                        var _g1 = 2;
                        var _g = o.length;
                        while (_g1 < _g) {
                            var i1 = _g1++;
                            if (i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1], s);
                            else str2 += js_Boot.__string_rec(o[i1], s);
                        }
                        return str2 + ")";
                    }
                    var l = o.length;
                    var i;
                    var str1 = "[";
                    s += "\t";
                    var _g2 = 0;
                    while (_g2 < l) {
                        var i2 = _g2++;
                        str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2], s);
                    }
                    str1 += "]";
                    return str1;
                }
                var tostr;
                try {
                    tostr = o.toString;
                } catch (e) {
                    if (e instanceof js__$Boot_HaxeError) e = e.val;
                    return "???";
                }
                if (tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
                    var s2 = o.toString();
                    if (s2 != "[object Object]") return s2;
                }
                var k = null;
                var str = "{\n";
                s += "\t";
                var hasp = o.hasOwnProperty != null;
                for (var k in o) {
                    if (hasp && !o.hasOwnProperty(k)) {
                        continue;
                    }
                    if (k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
                        continue;
                    }
                    if (str.length != 2) str += ", \n";
                    str += s + k + " : " + js_Boot.__string_rec(o[k], s);
                }
                s = s.substring(1);
                str += "\n" + s + "}";
                return str;
            case "function":
                return "<function>";
            case "string":
                return o;
            default:
                return String(o);
        }
    };
    js_Boot.__interfLoop = function(cc, cl) {
        if (cc == null) return false;
        if (cc == cl) return true;
        var intf = cc.__interfaces__;
        if (intf != null) {
            var _g1 = 0;
            var _g = intf.length;
            while (_g1 < _g) {
                var i = _g1++;
                var i1 = intf[i];
                if (i1 == cl || js_Boot.__interfLoop(i1, cl)) return true;
            }
        }
        return js_Boot.__interfLoop(cc.__super__, cl);
    };
    js_Boot.__instanceof = function(o, cl) {
        if (cl == null) return false;
        switch (cl) {
            case Int:
                return (o | 0) === o;
            case Float:
                return typeof(o) == "number";
            case Bool:
                return typeof(o) == "boolean";
            case String:
                return typeof(o) == "string";
            case Array:
                return (o instanceof Array) && o.__enum__ == null;
            case Dynamic:
                return true;
            default:
                if (o != null) {
                    if (typeof(cl) == "function") {
                        if (o instanceof cl) return true;
                        if (js_Boot.__interfLoop(js_Boot.getClass(o), cl)) return true;
                    } else if (typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
                        if (o instanceof cl) return true;
                    }
                } else return false;
                if (cl == Class && o.__name__ != null) return true;
                if (cl == Enum && o.__ename__ != null) return true;
                return o.__enum__ == cl;
        }
    };
    js_Boot.__cast = function(o, t) {
        if (js_Boot.__instanceof(o, t)) return o;
        else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
    };
    js_Boot.__nativeClassName = function(o) {
        var name = js_Boot.__toStr.call(o).slice(8, -1);
        if (name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
        return name;
    };
    js_Boot.__isNativeObj = function(o) {
        return js_Boot.__nativeClassName(o) != null;
    };
    js_Boot.__resolveNativeClass = function(name) {
        return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
    };
    var tools_attributes_Attribute = $hx_exports.Attribute = function(name) {
        this._name = name;
        this._value = 0;
        this._bonusValue = 0;
        this._baseValue = 0;
        this.set_bonusList(new List());
    };
    tools_attributes_Attribute.__name__ = true;
    tools_attributes_Attribute.prototype = {
        toString: function() {
            var str;
            str = "\t" + this.get_name() + " (base+bonus)) : " + (this.get_value() > 0 ? "+" : "") + this.get_value() + " (" + this.get_baseValue() + " + " + this.get_bonusValue() + ")\n";
            var bonusSum = 0;
            var _g = this.get_bonusList().iterator();
            while (_g.head != null) {
                var m;
                m = (function($this) {
                    var $r;
                    _g.val = _g.head[0];
                    _g.head = _g.head[1];
                    $r = _g.val;
                    return $r;
                }(this));
                str += "\t\t" + (m.value > 0 ? "+" : "") + m.value + " by " + (m.item != null ? m.item.get_name() : "") + (Std["is"](m.item.get_equipedOn(), tools_attributes_Item) ? " on " + (js_Boot.__cast(m.item.get_equipedOn(), tools_attributes_Item)).get_name() : "") + (m.label != null ? " (" + m.label + ")" : "") + "\n";
                bonusSum += m.value;
            }
            return str;
        },
        clearBonus: function() {
            this._bonusList.clear();
            this._bonusValue = 0;
            this._value = this._baseValue;
        },
        updateValue: function() {
            this._value = this._bonusValue + this._baseValue;
        },
        get_bonusValue: function() {
            return this._bonusValue;
        },
        set_bonusValue: function(value) {
            this._bonusValue = value;
            this.updateValue();
            return this._bonusValue;
        },
        get_name: function() {
            return this._name;
        },
        get_bonusList: function() {
            return this._bonusList;
        },
        set_bonusList: function(value) {
            return this._bonusList = value;
        },
        get_baseValue: function() {
            return this._baseValue;
        },
        set_baseValue: function(value) {
            this._baseValue = value;
            this.updateValue();
            return this._baseValue;
        },
        get_value: function() {
            return this._value;
        },
        __class__: tools_attributes_Attribute
    };
    var tools_attributes_AttributeJSExport = function() {};
    tools_attributes_AttributeJSExport.__name__ = true;
    tools_attributes_AttributeJSExport.main = function() {};
    tools_attributes_AttributeJSExport.prototype = {
        __class__: tools_attributes_AttributeJSExport
    };
    var tools_attributes_AttributeSet = $hx_exports.AttributeSet = function() {
        this._baseAttributes = new haxe_ds_StringMap();
        this._usedItems = new haxe_ds_StringMap();
        this._priorityLevels = [];
    };
    tools_attributes_AttributeSet.__name__ = true;
    tools_attributes_AttributeSet.prototype = {
        toString: function() {
            var str = "";
            str += "Items Equiped :\n";
            var $it0 = this._usedItems.iterator();
            while ($it0.hasNext()) {
                var s = $it0.next();
                str += s.toString();
            }
            str += "Attributes Values :\n";
            var $it1 = (function($this) {
                var $r;
                var this1 = $this.get_baseAttributes();
                $r = this1.iterator();
                return $r;
            }(this));
            while ($it1.hasNext()) {
                var s1 = $it1.next();
                str += s1.toString();
            }
            return str;
        },
        equip: function(item, refresh) {
            if (refresh == null) refresh = true;
            if (item.get_equipedOn() == null) {
                var key = item.get_name();
                this._usedItems.set(key, item);
                item.set_equipedOn(this);
                if (refresh) this.refresh();
                return true;
            } else return false;
        },
        unequip: function(item, refresh) {
            if (refresh == null) refresh = true;
            if (item.get_equipedOn() == this) {
                var key = item.get_name();
                this._usedItems.remove(key);
                if (refresh) this.refresh();
                return true;
            } else return false;
        },
        useItems: function(context, target) {
            var $it0 = (function($this) {
                var $r;
                var this1 = $this.get_items();
                $r = this1.iterator();
                return $r;
            }(this));
            while ($it0.hasNext()) {
                var i = $it0.next();
                i["use"](context, target);
            }
        },
        hasItem: function(itemName) {
            return this._usedItems.get(itemName) != null;
        },
        get: function(AttributeName) {
            var att = this._baseAttributes.get(AttributeName);
            if (att == null) {
                att = new tools_attributes_Attribute(AttributeName);
                this._baseAttributes.set(AttributeName, att);
            }
            return att;
        },
        refresh: function() {
            this.recalculate();
        },
        recalculate: function() {
            this.refreshAttributesBonusList();
            this.refreshBonusValues();
            this.refreshItems();
            var $it0 = this._baseAttributes.iterator();
            while ($it0.hasNext()) {
                var att = $it0.next();
                att.set_bonusValue(0);
            }
            var $it1 = this._usedItems.iterator();
            while ($it1.hasNext()) {
                var i = $it1.next();
                var $it2 = (function($this) {
                    var $r;
                    var this1 = i.get_baseAttributes();
                    $r = this1.iterator();
                    return $r;
                }(this));
                while ($it2.hasNext()) {
                    var att1 = $it2.next();
                    var _g = this.get(att1.get_name());
                    _g.set_bonusValue(_g.get_bonusValue() + att1.get_value());
                    var _g1 = att1.get_bonusList().iterator();
                    while (_g1.head != null) {
                        var b;
                        b = (function($this) {
                            var $r;
                            _g1.val = _g1.head[0];
                            _g1.head = _g1.head[1];
                            $r = _g1.val;
                            return $r;
                        }(this));
                        this.get(att1.get_name()).get_bonusList().add(b);
                    }
                }
            }
        },
        refreshItems: function() {
            var $it0 = this._usedItems.iterator();
            while ($it0.hasNext()) {
                var i = $it0.next();
                i.calculateBaseValues();
                i.recalculate();
            }
        },
        refreshAttributesBonusList: function() {
            this.clearBonus();
            this._priorityLevels.splice(0, this._priorityLevels.length);
            var $it0 = this._usedItems.iterator();
            while ($it0.hasNext()) {
                var item = $it0.next();
                var _g_head = item.bonusList.h;
                var _g_val = null;
                while (_g_head != null) {
                    var bonus;
                    bonus = (function($this) {
                        var $r;
                        _g_val = _g_head[0];
                        _g_head = _g_head[1];
                        $r = _g_val;
                        return $r;
                    }(this));
                    if (!Lambda.has(this._priorityLevels, bonus.priority)) this._priorityLevels.push(bonus.priority);
                    this.get(bonus.attributeName).get_bonusList().add(bonus);
                }
            }
        },
        refreshBonusValues: function() {
            this._priorityLevels.sort($bind(this, this.prioritySort));
            var _g = 0;
            var _g1 = this._priorityLevels;
            while (_g < _g1.length) {
                var priority = _g1[_g];
                ++_g;
                var $it0 = (function($this) {
                    var $r;
                    var this1 = $this.get_baseAttributes();
                    $r = this1.iterator();
                    return $r;
                }(this));
                while ($it0.hasNext()) {
                    var att = $it0.next();
                    var _g2 = att.get_bonusList().iterator();
                    while (_g2.head != null) {
                        var b;
                        b = (function($this) {
                            var $r;
                            _g2.val = _g2.head[0];
                            _g2.head = _g2.head[1];
                            $r = _g2.val;
                            return $r;
                        }(this));
                        if (b.priority == priority) b.update(this);
                    }
                }
                var $it1 = (function($this) {
                    var $r;
                    var this2 = $this.get_baseAttributes();
                    $r = this2.iterator();
                    return $r;
                }(this));
                while ($it1.hasNext()) {
                    var att1 = $it1.next();
                    var _g21 = att1.get_bonusList().iterator();
                    while (_g21.head != null) {
                        var b1;
                        b1 = (function($this) {
                            var $r;
                            _g21.val = _g21.head[0];
                            _g21.head = _g21.head[1];
                            $r = _g21.val;
                            return $r;
                        }(this));
                        if (b1.priority == priority) {
                            var _g22 = att1;
                            _g22.set_bonusValue(_g22.get_bonusValue() + b1.value);
                        }
                    }
                }
            }
        },
        prioritySort: function(p1, p2) {
            return p1 - p2;
        },
        clearBonus: function() {
            if (this._baseAttributes != null) {
                var $it0 = this._baseAttributes.iterator();
                while ($it0.hasNext()) {
                    var att = $it0.next();
                    att.clearBonus();
                }
            }
        },
        get_items: function() {
            return this._usedItems;
        },
        get_baseAttributes: function() {
            return this._baseAttributes;
        },
        __class__: tools_attributes_AttributeSet
    };
    var tools_attributes_Bonus = $hx_exports.Bonus = function(attributeName, formula, priority, label) {
        if (priority == null) priority = 0;
        this.label = label;
        this.formula = formula;
        this.attributeName = attributeName;
        this.priority = priority;
        this.value = 0;
    };
    tools_attributes_Bonus.__name__ = true;
    tools_attributes_Bonus.prototype = {
        update: function(attributes) {
            if (this.formula != null) this.value = this.formula(attributes, this);
        },
        toString: function() {
            var str = "";
            str += this.attributeName + " : " + (this.value > 0 ? "+" : "") + this.value + (this.label != null ? " (" + this.label + ")" : "");
            return str;
        },
        __class__: tools_attributes_Bonus
    };
    var tools_attributes_Effect = $hx_exports.Effect = function(effectFunction, priority, effectLabel) {
        if (priority == null) priority = 0;
        this.priority = priority;
        this.proc = effectFunction;
        this.label = effectLabel;
        this.item = null;
    };
    tools_attributes_Effect.__name__ = true;
    tools_attributes_Effect.sort = function(e1, e2) {
        return e1.priority - e2.priority;
    };
    tools_attributes_Effect.prototype = {
        toString: function(parentItem) {
            var str = "";
            if (this.item != parentItem && this.item != null) str += "[" + this.item.get_name() + "] ";
            if (this.label != null) str += " (" + this.label + ")";
            else str += "";
            return str;
        },
        applyEffect: function(context, target) {
            if (this.proc != null) return this.proc(context, target);
            return false;
        },
        __class__: tools_attributes_Effect
    };
    var tools_attributes_Item = $hx_exports.Item = function(name) {
        tools_attributes_AttributeSet.call(this);
        this._name = name;
        this._equipedOn = null;
        this.bonusList = new List();
        this.effectList = [];
    };
    tools_attributes_Item.__name__ = true;
    tools_attributes_Item.__super__ = tools_attributes_AttributeSet;
    tools_attributes_Item.prototype = $extend(tools_attributes_AttributeSet.prototype, {
        toString: function() {
            var str = "\t" + this.get_name() + " :\n";
            str += "\t    Bonus list\n";
            var _g_head = this.bonusList.h;
            var _g_val = null;
            while (_g_head != null) {
                var m;
                m = (function($this) {
                    var $r;
                    _g_val = _g_head[0];
                    _g_head = _g_head[1];
                    $r = _g_val;
                    return $r;
                }(this));
                str += "\t\t" + m.toString() + "\n";
            }
            var $it0 = (function($this) {
                var $r;
                var this1 = $this.get_baseAttributes();
                $r = this1.iterator();
                return $r;
            }(this));
            while ($it0.hasNext()) {
                var att = $it0.next();
                var _g = att.get_bonusList().iterator();
                while (_g.head != null) {
                    var m1;
                    m1 = (function($this) {
                        var $r;
                        _g.val = _g.head[0];
                        _g.head = _g.head[1];
                        $r = _g.val;
                        return $r;
                    }(this));
                    str += "\t\t" + (this != m1.item && m1.item != null ? "[" + m1.item.printParentsUntil(this) + "] " : "") + m1.toString() + "\n";
                }
            }
            str += "\t    Bonus values\n";
            var $it1 = (function($this) {
                var $r;
                var this2 = $this.get_baseAttributes();
                $r = this2.iterator();
                return $r;
            }(this));
            while ($it1.hasNext()) {
                var s = $it1.next();
                str += "\t\t" + s.get_name() + ": " + s.get_value() + "\n";
            }
            if (this.effectList.length > 0) str += "\t    Effects list\n";
            var _g1 = 0;
            var _g11 = this.effectList;
            while (_g1 < _g11.length) {
                var e = _g11[_g1];
                ++_g1;
                str += "\t\t" + e.toString(this) + "\n";
            }
            return str;
        },
        printParentsUntil: function(until) {
            var str = "";
            var item = this;
            var sep = "";
            while (item != null && item != until) {
                str += sep + item.get_name();
                if (Std["is"](item.get_equipedOn(), tools_attributes_Item)) item = js_Boot.__cast(item.get_equipedOn(), tools_attributes_Item);
                else item = null;
                sep = " > ";
            }
            return str;
        },
        refresh: function() {
            if (this._equipedOn != null) this._equipedOn.refresh();
            else tools_attributes_AttributeSet.prototype.recalculate.call(this);
        },
        calculateBaseValues: function() {
            var $it0 = (function($this) {
                var $r;
                var this1 = $this.get_baseAttributes();
                $r = this1.iterator();
                return $r;
            }(this));
            while ($it0.hasNext()) {
                var att = $it0.next();
                att.set_baseValue(0);
            }
            var _g_head = this.bonusList.h;
            var _g_val = null;
            while (_g_head != null) {
                var b;
                b = (function($this) {
                    var $r;
                    _g_val = _g_head[0];
                    _g_head = _g_head[1];
                    $r = _g_val;
                    return $r;
                }(this));
                var _g = this.get(b.attributeName);
                _g.set_baseValue(_g.get_baseValue() + b.value);
            }
        },
        simulateOn: function(attributes) {
            if (this._equipedOn != null) return false;
            if (attributes == null) attributes = tools_attributes_AttributeSet.emptyAttributeSet;
            attributes.equip(this);
            attributes.unequip(this);
            return true;
        },
        'use': function(context, target) {
            var _g1 = 0;
            var _g = this.effectList.length;
            while (_g1 < _g) {
                var i = _g1++;
                var e = this.effectList[i];
                e.applyEffect(context, target);
            }
        },
        addEffect: function(effect) {
            if (effect.item == null) {
                this.effectList.push(effect);
                effect.item = this;
                this.effectList.sort(tools_attributes_Effect.sort);
                return true;
            } else return false;
        },
        hasEffect: function(effect) {
            return Lambda.has(this.effectList, effect);
        },
        removeEffect: function(effect) {
            if (effect.item == this) {
                effect.item = null;
                HxOverrides.remove(this.effectList, effect);
                return true;
            } else return false;
        },
        add: function(bonus) {
            if (bonus.item == null) {
                this.bonusList.add(bonus);
                bonus.item = this;
                this.calculateBaseValues();
                return true;
            } else return false;
        },
        addAdditionBonus: function(attributeName, value, priority, label) {
            if (priority == null) priority = 0;
            this.add(new tools_attributes_bonus_AdditionBonus(attributeName, value, priority, label));
        },
        addMultiplicationBonus: function(attributeName, multiple, priority, label) {
            if (priority == null) priority = 0;
            this.add(new tools_attributes_bonus_MultiplicationBonus(attributeName, multiple, priority, label));
        },
        has: function(bonus) {
            return Lambda.has(this.bonusList, bonus);
        },
        remove: function(bonus) {
            if (bonus.item == this) {
                bonus.item = null;
                this.bonusList.remove(bonus);
                this.calculateBaseValues();
                return true;
            } else return false;
        },
        get_equipedOn: function() {
            return this._equipedOn;
        },
        set_equipedOn: function(value) {
            return this._equipedOn = value;
        },
        get_name: function() {
            return this._name;
        },
        __class__: tools_attributes_Item
    });
    var tools_attributes_bonus_AdditionBonus = $hx_exports.AdditionBonus = function(attributeName, value, priority, label) {
        tools_attributes_Bonus.call(this, attributeName, null, priority, label);
        this.value = value;
    };
    tools_attributes_bonus_AdditionBonus.__name__ = true;
    tools_attributes_bonus_AdditionBonus.__super__ = tools_attributes_Bonus;
    tools_attributes_bonus_AdditionBonus.prototype = $extend(tools_attributes_Bonus.prototype, {
        __class__: tools_attributes_bonus_AdditionBonus
    });
    var tools_attributes_bonus_MultiplicationBonus = $hx_exports.MultiplicationBonus = function(attributeName, multiple, priority, label) {
        tools_attributes_Bonus.call(this, attributeName, $bind(this, this.multiplyValue), priority, label);
        this._multiple = multiple;
    };
    tools_attributes_bonus_MultiplicationBonus.__name__ = true;
    tools_attributes_bonus_MultiplicationBonus.__super__ = tools_attributes_Bonus;
    tools_attributes_bonus_MultiplicationBonus.prototype = $extend(tools_attributes_Bonus.prototype, {
        multiplyValue: function(attributes, bonus) {
            return attributes.get(this.attributeName).get_value() * this._multiple;
        },
        __class__: tools_attributes_bonus_MultiplicationBonus
    });

    function $iterator(o) {
        if (o instanceof Array) return function() {
            return HxOverrides.iter(o);
        };
        return typeof(o.iterator) == 'function' ? $bind(o, o.iterator) : o.iterator;
    }
    var $_, $fid = 0;

    function $bind(o, m) {
        if (m == null) return null;
        if (m.__id__ == null) m.__id__ = $fid++;
        var f;
        if (o.hx__closures__ == null) o.hx__closures__ = {};
        else f = o.hx__closures__[m.__id__];
        if (f == null) {
            f = function() {
                return f.method.apply(f.scope, arguments);
            };
            f.scope = o;
            f.method = m;
            o.hx__closures__[m.__id__] = f;
        }
        return f;
    }
    if (Array.prototype.indexOf) HxOverrides.indexOf = function(a, o, i) {
        return Array.prototype.indexOf.call(a, o, i);
    };
    String.prototype.__class__ = String;
    String.__name__ = true;
    Array.__name__ = true;
    var Int = {
        __name__: ["Int"]
    };
    var Dynamic = {
        __name__: ["Dynamic"]
    };
    var Float = Number;
    Float.__name__ = ["Float"];
    var Bool = Boolean;
    Bool.__ename__ = ["Bool"];
    var Class = {
        __name__: ["Class"]
    };
    var Enum = {};
    var __map_reserved = {}
    js_Boot.__toStr = {}.toString;
    tools_attributes_AttributeSet.emptyAttributeSet = new tools_attributes_AttributeSet();
    tools_attributes_AttributeJSExport.main();
})(typeof console != "undefined" ? console : {
    log: function() {}
}, typeof module.exports != "undefined" ? module.exports : exports);
