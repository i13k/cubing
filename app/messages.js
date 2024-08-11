/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.SortScoresResponse = (function() {

    /**
     * Properties of a SortScoresResponse.
     * @exports ISortScoresResponse
     * @interface ISortScoresResponse
     * @property {string|null} [name] SortScoresResponse name
     * @property {Array.<number>|null} [times] SortScoresResponse times
     * @property {string|null} [avg] SortScoresResponse avg
     * @property {Array.<number>|null} [gray] SortScoresResponse gray
     * @property {number|null} [place] SortScoresResponse place
     * @property {boolean|null} [green] SortScoresResponse green
     */

    /**
     * Constructs a new SortScoresResponse.
     * @exports SortScoresResponse
     * @classdesc Represents a SortScoresResponse.
     * @implements ISortScoresResponse
     * @constructor
     * @param {ISortScoresResponse=} [properties] Properties to set
     */
    function SortScoresResponse(properties) {
        this.times = [];
        this.gray = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SortScoresResponse name.
     * @member {string} name
     * @memberof SortScoresResponse
     * @instance
     */
    SortScoresResponse.prototype.name = "";

    /**
     * SortScoresResponse times.
     * @member {Array.<number>} times
     * @memberof SortScoresResponse
     * @instance
     */
    SortScoresResponse.prototype.times = $util.emptyArray;

    /**
     * SortScoresResponse avg.
     * @member {string} avg
     * @memberof SortScoresResponse
     * @instance
     */
    SortScoresResponse.prototype.avg = "";

    /**
     * SortScoresResponse gray.
     * @member {Array.<number>} gray
     * @memberof SortScoresResponse
     * @instance
     */
    SortScoresResponse.prototype.gray = $util.emptyArray;

    /**
     * SortScoresResponse place.
     * @member {number} place
     * @memberof SortScoresResponse
     * @instance
     */
    SortScoresResponse.prototype.place = 0;

    /**
     * SortScoresResponse green.
     * @member {boolean} green
     * @memberof SortScoresResponse
     * @instance
     */
    SortScoresResponse.prototype.green = false;

    /**
     * Creates a new SortScoresResponse instance using the specified properties.
     * @function create
     * @memberof SortScoresResponse
     * @static
     * @param {ISortScoresResponse=} [properties] Properties to set
     * @returns {SortScoresResponse} SortScoresResponse instance
     */
    SortScoresResponse.create = function create(properties) {
        return new SortScoresResponse(properties);
    };

    /**
     * Encodes the specified SortScoresResponse message. Does not implicitly {@link SortScoresResponse.verify|verify} messages.
     * @function encode
     * @memberof SortScoresResponse
     * @static
     * @param {ISortScoresResponse} message SortScoresResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SortScoresResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.times != null && message.times.length) {
            writer.uint32(/* id 2, wireType 2 =*/18).fork();
            for (var i = 0; i < message.times.length; ++i)
                writer.double(message.times[i]);
            writer.ldelim();
        }
        if (message.avg != null && Object.hasOwnProperty.call(message, "avg"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.avg);
        if (message.gray != null && message.gray.length) {
            writer.uint32(/* id 4, wireType 2 =*/34).fork();
            for (var i = 0; i < message.gray.length; ++i)
                writer.uint32(message.gray[i]);
            writer.ldelim();
        }
        if (message.place != null && Object.hasOwnProperty.call(message, "place"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.place);
        if (message.green != null && Object.hasOwnProperty.call(message, "green"))
            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.green);
        return writer;
    };

    /**
     * Encodes the specified SortScoresResponse message, length delimited. Does not implicitly {@link SortScoresResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SortScoresResponse
     * @static
     * @param {ISortScoresResponse} message SortScoresResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SortScoresResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SortScoresResponse message from the specified reader or buffer.
     * @function decode
     * @memberof SortScoresResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SortScoresResponse} SortScoresResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SortScoresResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SortScoresResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.name = reader.string();
                    break;
                }
            case 2: {
                    if (!(message.times && message.times.length))
                        message.times = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.times.push(reader.double());
                    } else
                        message.times.push(reader.double());
                    break;
                }
            case 3: {
                    message.avg = reader.string();
                    break;
                }
            case 4: {
                    if (!(message.gray && message.gray.length))
                        message.gray = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.gray.push(reader.uint32());
                    } else
                        message.gray.push(reader.uint32());
                    break;
                }
            case 5: {
                    message.place = reader.uint32();
                    break;
                }
            case 6: {
                    message.green = reader.bool();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SortScoresResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SortScoresResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SortScoresResponse} SortScoresResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SortScoresResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SortScoresResponse message.
     * @function verify
     * @memberof SortScoresResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SortScoresResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.times != null && message.hasOwnProperty("times")) {
            if (!Array.isArray(message.times))
                return "times: array expected";
            for (var i = 0; i < message.times.length; ++i)
                if (typeof message.times[i] !== "number")
                    return "times: number[] expected";
        }
        if (message.avg != null && message.hasOwnProperty("avg"))
            if (!$util.isString(message.avg))
                return "avg: string expected";
        if (message.gray != null && message.hasOwnProperty("gray")) {
            if (!Array.isArray(message.gray))
                return "gray: array expected";
            for (var i = 0; i < message.gray.length; ++i)
                if (!$util.isInteger(message.gray[i]))
                    return "gray: integer[] expected";
        }
        if (message.place != null && message.hasOwnProperty("place"))
            if (!$util.isInteger(message.place))
                return "place: integer expected";
        if (message.green != null && message.hasOwnProperty("green"))
            if (typeof message.green !== "boolean")
                return "green: boolean expected";
        return null;
    };

    /**
     * Creates a SortScoresResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SortScoresResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SortScoresResponse} SortScoresResponse
     */
    SortScoresResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.SortScoresResponse)
            return object;
        var message = new $root.SortScoresResponse();
        if (object.name != null)
            message.name = String(object.name);
        if (object.times) {
            if (!Array.isArray(object.times))
                throw TypeError(".SortScoresResponse.times: array expected");
            message.times = [];
            for (var i = 0; i < object.times.length; ++i)
                message.times[i] = Number(object.times[i]);
        }
        if (object.avg != null)
            message.avg = String(object.avg);
        if (object.gray) {
            if (!Array.isArray(object.gray))
                throw TypeError(".SortScoresResponse.gray: array expected");
            message.gray = [];
            for (var i = 0; i < object.gray.length; ++i)
                message.gray[i] = object.gray[i] >>> 0;
        }
        if (object.place != null)
            message.place = object.place >>> 0;
        if (object.green != null)
            message.green = Boolean(object.green);
        return message;
    };

    /**
     * Creates a plain object from a SortScoresResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SortScoresResponse
     * @static
     * @param {SortScoresResponse} message SortScoresResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SortScoresResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.times = [];
            object.gray = [];
        }
        if (options.defaults) {
            object.name = "";
            object.avg = "";
            object.place = 0;
            object.green = false;
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.times && message.times.length) {
            object.times = [];
            for (var j = 0; j < message.times.length; ++j)
                object.times[j] = options.json && !isFinite(message.times[j]) ? String(message.times[j]) : message.times[j];
        }
        if (message.avg != null && message.hasOwnProperty("avg"))
            object.avg = message.avg;
        if (message.gray && message.gray.length) {
            object.gray = [];
            for (var j = 0; j < message.gray.length; ++j)
                object.gray[j] = message.gray[j];
        }
        if (message.place != null && message.hasOwnProperty("place"))
            object.place = message.place;
        if (message.green != null && message.hasOwnProperty("green"))
            object.green = message.green;
        return object;
    };

    /**
     * Converts this SortScoresResponse to JSON.
     * @function toJSON
     * @memberof SortScoresResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SortScoresResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SortScoresResponse
     * @function getTypeUrl
     * @memberof SortScoresResponse
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SortScoresResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/SortScoresResponse";
    };

    return SortScoresResponse;
})();

$root.ScoresResponse = (function() {

    /**
     * Properties of a ScoresResponse.
     * @exports IScoresResponse
     * @interface IScoresResponse
     * @property {string|null} [name] ScoresResponse name
     * @property {Array.<number>|null} [times] ScoresResponse times
     */

    /**
     * Constructs a new ScoresResponse.
     * @exports ScoresResponse
     * @classdesc Represents a ScoresResponse.
     * @implements IScoresResponse
     * @constructor
     * @param {IScoresResponse=} [properties] Properties to set
     */
    function ScoresResponse(properties) {
        this.times = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ScoresResponse name.
     * @member {string} name
     * @memberof ScoresResponse
     * @instance
     */
    ScoresResponse.prototype.name = "";

    /**
     * ScoresResponse times.
     * @member {Array.<number>} times
     * @memberof ScoresResponse
     * @instance
     */
    ScoresResponse.prototype.times = $util.emptyArray;

    /**
     * Creates a new ScoresResponse instance using the specified properties.
     * @function create
     * @memberof ScoresResponse
     * @static
     * @param {IScoresResponse=} [properties] Properties to set
     * @returns {ScoresResponse} ScoresResponse instance
     */
    ScoresResponse.create = function create(properties) {
        return new ScoresResponse(properties);
    };

    /**
     * Encodes the specified ScoresResponse message. Does not implicitly {@link ScoresResponse.verify|verify} messages.
     * @function encode
     * @memberof ScoresResponse
     * @static
     * @param {IScoresResponse} message ScoresResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ScoresResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.times != null && message.times.length) {
            writer.uint32(/* id 2, wireType 2 =*/18).fork();
            for (var i = 0; i < message.times.length; ++i)
                writer.double(message.times[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified ScoresResponse message, length delimited. Does not implicitly {@link ScoresResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ScoresResponse
     * @static
     * @param {IScoresResponse} message ScoresResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ScoresResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ScoresResponse message from the specified reader or buffer.
     * @function decode
     * @memberof ScoresResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ScoresResponse} ScoresResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ScoresResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ScoresResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.name = reader.string();
                    break;
                }
            case 2: {
                    if (!(message.times && message.times.length))
                        message.times = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.times.push(reader.double());
                    } else
                        message.times.push(reader.double());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ScoresResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ScoresResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ScoresResponse} ScoresResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ScoresResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ScoresResponse message.
     * @function verify
     * @memberof ScoresResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ScoresResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.times != null && message.hasOwnProperty("times")) {
            if (!Array.isArray(message.times))
                return "times: array expected";
            for (var i = 0; i < message.times.length; ++i)
                if (typeof message.times[i] !== "number")
                    return "times: number[] expected";
        }
        return null;
    };

    /**
     * Creates a ScoresResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ScoresResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ScoresResponse} ScoresResponse
     */
    ScoresResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.ScoresResponse)
            return object;
        var message = new $root.ScoresResponse();
        if (object.name != null)
            message.name = String(object.name);
        if (object.times) {
            if (!Array.isArray(object.times))
                throw TypeError(".ScoresResponse.times: array expected");
            message.times = [];
            for (var i = 0; i < object.times.length; ++i)
                message.times[i] = Number(object.times[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a ScoresResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ScoresResponse
     * @static
     * @param {ScoresResponse} message ScoresResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ScoresResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.times = [];
        if (options.defaults)
            object.name = "";
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.times && message.times.length) {
            object.times = [];
            for (var j = 0; j < message.times.length; ++j)
                object.times[j] = options.json && !isFinite(message.times[j]) ? String(message.times[j]) : message.times[j];
        }
        return object;
    };

    /**
     * Converts this ScoresResponse to JSON.
     * @function toJSON
     * @memberof ScoresResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ScoresResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ScoresResponse
     * @function getTypeUrl
     * @memberof ScoresResponse
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ScoresResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ScoresResponse";
    };

    return ScoresResponse;
})();

$root.ArraySortScoreResponse = (function() {

    /**
     * Properties of an ArraySortScoreResponse.
     * @exports IArraySortScoreResponse
     * @interface IArraySortScoreResponse
     * @property {Array.<ISortScoresResponse>|null} [responses] ArraySortScoreResponse responses
     */

    /**
     * Constructs a new ArraySortScoreResponse.
     * @exports ArraySortScoreResponse
     * @classdesc Represents an ArraySortScoreResponse.
     * @implements IArraySortScoreResponse
     * @constructor
     * @param {IArraySortScoreResponse=} [properties] Properties to set
     */
    function ArraySortScoreResponse(properties) {
        this.responses = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ArraySortScoreResponse responses.
     * @member {Array.<ISortScoresResponse>} responses
     * @memberof ArraySortScoreResponse
     * @instance
     */
    ArraySortScoreResponse.prototype.responses = $util.emptyArray;

    /**
     * Creates a new ArraySortScoreResponse instance using the specified properties.
     * @function create
     * @memberof ArraySortScoreResponse
     * @static
     * @param {IArraySortScoreResponse=} [properties] Properties to set
     * @returns {ArraySortScoreResponse} ArraySortScoreResponse instance
     */
    ArraySortScoreResponse.create = function create(properties) {
        return new ArraySortScoreResponse(properties);
    };

    /**
     * Encodes the specified ArraySortScoreResponse message. Does not implicitly {@link ArraySortScoreResponse.verify|verify} messages.
     * @function encode
     * @memberof ArraySortScoreResponse
     * @static
     * @param {IArraySortScoreResponse} message ArraySortScoreResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ArraySortScoreResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.responses != null && message.responses.length)
            for (var i = 0; i < message.responses.length; ++i)
                $root.SortScoresResponse.encode(message.responses[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ArraySortScoreResponse message, length delimited. Does not implicitly {@link ArraySortScoreResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ArraySortScoreResponse
     * @static
     * @param {IArraySortScoreResponse} message ArraySortScoreResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ArraySortScoreResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ArraySortScoreResponse message from the specified reader or buffer.
     * @function decode
     * @memberof ArraySortScoreResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ArraySortScoreResponse} ArraySortScoreResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ArraySortScoreResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ArraySortScoreResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.responses && message.responses.length))
                        message.responses = [];
                    message.responses.push($root.SortScoresResponse.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ArraySortScoreResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ArraySortScoreResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ArraySortScoreResponse} ArraySortScoreResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ArraySortScoreResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ArraySortScoreResponse message.
     * @function verify
     * @memberof ArraySortScoreResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ArraySortScoreResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.responses != null && message.hasOwnProperty("responses")) {
            if (!Array.isArray(message.responses))
                return "responses: array expected";
            for (var i = 0; i < message.responses.length; ++i) {
                var error = $root.SortScoresResponse.verify(message.responses[i]);
                if (error)
                    return "responses." + error;
            }
        }
        return null;
    };

    /**
     * Creates an ArraySortScoreResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ArraySortScoreResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ArraySortScoreResponse} ArraySortScoreResponse
     */
    ArraySortScoreResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.ArraySortScoreResponse)
            return object;
        var message = new $root.ArraySortScoreResponse();
        if (object.responses) {
            if (!Array.isArray(object.responses))
                throw TypeError(".ArraySortScoreResponse.responses: array expected");
            message.responses = [];
            for (var i = 0; i < object.responses.length; ++i) {
                if (typeof object.responses[i] !== "object")
                    throw TypeError(".ArraySortScoreResponse.responses: object expected");
                message.responses[i] = $root.SortScoresResponse.fromObject(object.responses[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from an ArraySortScoreResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ArraySortScoreResponse
     * @static
     * @param {ArraySortScoreResponse} message ArraySortScoreResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ArraySortScoreResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.responses = [];
        if (message.responses && message.responses.length) {
            object.responses = [];
            for (var j = 0; j < message.responses.length; ++j)
                object.responses[j] = $root.SortScoresResponse.toObject(message.responses[j], options);
        }
        return object;
    };

    /**
     * Converts this ArraySortScoreResponse to JSON.
     * @function toJSON
     * @memberof ArraySortScoreResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ArraySortScoreResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ArraySortScoreResponse
     * @function getTypeUrl
     * @memberof ArraySortScoreResponse
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ArraySortScoreResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ArraySortScoreResponse";
    };

    return ArraySortScoreResponse;
})();

$root.ArrayScoresResponse = (function() {

    /**
     * Properties of an ArrayScoresResponse.
     * @exports IArrayScoresResponse
     * @interface IArrayScoresResponse
     * @property {Array.<IScoresResponse>|null} [responses] ArrayScoresResponse responses
     */

    /**
     * Constructs a new ArrayScoresResponse.
     * @exports ArrayScoresResponse
     * @classdesc Represents an ArrayScoresResponse.
     * @implements IArrayScoresResponse
     * @constructor
     * @param {IArrayScoresResponse=} [properties] Properties to set
     */
    function ArrayScoresResponse(properties) {
        this.responses = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ArrayScoresResponse responses.
     * @member {Array.<IScoresResponse>} responses
     * @memberof ArrayScoresResponse
     * @instance
     */
    ArrayScoresResponse.prototype.responses = $util.emptyArray;

    /**
     * Creates a new ArrayScoresResponse instance using the specified properties.
     * @function create
     * @memberof ArrayScoresResponse
     * @static
     * @param {IArrayScoresResponse=} [properties] Properties to set
     * @returns {ArrayScoresResponse} ArrayScoresResponse instance
     */
    ArrayScoresResponse.create = function create(properties) {
        return new ArrayScoresResponse(properties);
    };

    /**
     * Encodes the specified ArrayScoresResponse message. Does not implicitly {@link ArrayScoresResponse.verify|verify} messages.
     * @function encode
     * @memberof ArrayScoresResponse
     * @static
     * @param {IArrayScoresResponse} message ArrayScoresResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ArrayScoresResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.responses != null && message.responses.length)
            for (var i = 0; i < message.responses.length; ++i)
                $root.ScoresResponse.encode(message.responses[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ArrayScoresResponse message, length delimited. Does not implicitly {@link ArrayScoresResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ArrayScoresResponse
     * @static
     * @param {IArrayScoresResponse} message ArrayScoresResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ArrayScoresResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ArrayScoresResponse message from the specified reader or buffer.
     * @function decode
     * @memberof ArrayScoresResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ArrayScoresResponse} ArrayScoresResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ArrayScoresResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ArrayScoresResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.responses && message.responses.length))
                        message.responses = [];
                    message.responses.push($root.ScoresResponse.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ArrayScoresResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ArrayScoresResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ArrayScoresResponse} ArrayScoresResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ArrayScoresResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ArrayScoresResponse message.
     * @function verify
     * @memberof ArrayScoresResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ArrayScoresResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.responses != null && message.hasOwnProperty("responses")) {
            if (!Array.isArray(message.responses))
                return "responses: array expected";
            for (var i = 0; i < message.responses.length; ++i) {
                var error = $root.ScoresResponse.verify(message.responses[i]);
                if (error)
                    return "responses." + error;
            }
        }
        return null;
    };

    /**
     * Creates an ArrayScoresResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ArrayScoresResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ArrayScoresResponse} ArrayScoresResponse
     */
    ArrayScoresResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.ArrayScoresResponse)
            return object;
        var message = new $root.ArrayScoresResponse();
        if (object.responses) {
            if (!Array.isArray(object.responses))
                throw TypeError(".ArrayScoresResponse.responses: array expected");
            message.responses = [];
            for (var i = 0; i < object.responses.length; ++i) {
                if (typeof object.responses[i] !== "object")
                    throw TypeError(".ArrayScoresResponse.responses: object expected");
                message.responses[i] = $root.ScoresResponse.fromObject(object.responses[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from an ArrayScoresResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ArrayScoresResponse
     * @static
     * @param {ArrayScoresResponse} message ArrayScoresResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ArrayScoresResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.responses = [];
        if (message.responses && message.responses.length) {
            object.responses = [];
            for (var j = 0; j < message.responses.length; ++j)
                object.responses[j] = $root.ScoresResponse.toObject(message.responses[j], options);
        }
        return object;
    };

    /**
     * Converts this ArrayScoresResponse to JSON.
     * @function toJSON
     * @memberof ArrayScoresResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ArrayScoresResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ArrayScoresResponse
     * @function getTypeUrl
     * @memberof ArrayScoresResponse
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ArrayScoresResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ArrayScoresResponse";
    };

    return ArrayScoresResponse;
})();

module.exports = $root;
