var Long = (require('bytebuffer')).Long;

var v = require('./validation');
var DB_MAX_INSTANCE_ID = Long.fromNumber(((Math.pow(2,48))-1));

var ObjectId = function () {
    function ObjectId(space, type, instance) {
        this.space = space;
        this.type = type;
        this.instance = instance;
        var instance_string = this.instance.toString();
        var object_id = this.space + "." + this.type + "." + instance_string;
        if (!v.is_digits(instance_string)) {
            throw new ("Invalid object id " + object_id)();
        }
    }

    ObjectId.fromString = function fromString(value) {
        if (value.space !== undefined && value.type !== undefined && value.instance !== undefined) {
            return value;
        }
        var params = v.require_match(/^([0-9]+)\.([0-9]+)\.([0-9]+)$/, v.required(value, "object_id"), "object_id");
        return new ObjectId(parseInt(params[1]), parseInt(params[2]), Long.fromString(params[3]));
    };

    ObjectId.fromLong = function fromLong(long) {
        var space = long.shiftRight(56).toInt();
        var type = long.shiftRight(48).toInt() & 0x00ff;
        var instance = long.and(DB_MAX_INSTANCE_ID);
        return new ObjectId(space, type, instance);
    };

    ObjectId.fromByteBuffer = function fromByteBuffer(b) {
        return ObjectId.fromLong(b.readUint64());
    };

    ObjectId.prototype.toLong = function toLong() {
        return Long.fromNumber(this.space).shiftLeft(56).or(Long.fromNumber(this.type).shiftLeft(48).or(this.instance));
    };

    ObjectId.prototype.appendByteBuffer = function appendByteBuffer(b) {
        return b.writeUint64(this.toLong());
    };

    ObjectId.prototype.toString = function toString() {
        return this.space + "." + this.type + "." + this.instance.toString();
    };

    return ObjectId;
}();

module.exports = ObjectId;
