import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a SortScoresResponse. */
export interface ISortScoresResponse {

    /** SortScoresResponse name */
    name?: (string|null);

    /** SortScoresResponse times */
    times?: (string[]|null);

    /** SortScoresResponse avg */
    avg?: (string|null);

    /** SortScoresResponse gray */
    gray?: (string[]|null);

    /** SortScoresResponse place */
    place?: (number|null);

    /** SortScoresResponse green */
    green?: (boolean|null);
}

/** Represents a SortScoresResponse. */
export class SortScoresResponse implements ISortScoresResponse {

    /**
     * Constructs a new SortScoresResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISortScoresResponse);

    /** SortScoresResponse name. */
    public name: string;

    /** SortScoresResponse times. */
    public times: string[];

    /** SortScoresResponse avg. */
    public avg: string;

    /** SortScoresResponse gray. */
    public gray: string[];

    /** SortScoresResponse place. */
    public place: number;

    /** SortScoresResponse green. */
    public green: boolean;

    /**
     * Creates a new SortScoresResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SortScoresResponse instance
     */
    public static create(properties?: ISortScoresResponse): SortScoresResponse;

    /**
     * Encodes the specified SortScoresResponse message. Does not implicitly {@link SortScoresResponse.verify|verify} messages.
     * @param message SortScoresResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISortScoresResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SortScoresResponse message, length delimited. Does not implicitly {@link SortScoresResponse.verify|verify} messages.
     * @param message SortScoresResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISortScoresResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SortScoresResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SortScoresResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SortScoresResponse;

    /**
     * Decodes a SortScoresResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SortScoresResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SortScoresResponse;

    /**
     * Verifies a SortScoresResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SortScoresResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SortScoresResponse
     */
    public static fromObject(object: { [k: string]: any }): SortScoresResponse;

    /**
     * Creates a plain object from a SortScoresResponse message. Also converts values to other types if specified.
     * @param message SortScoresResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SortScoresResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SortScoresResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for SortScoresResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a ScoresResponse. */
export interface IScoresResponse {

    /** ScoresResponse name */
    name?: (string|null);

    /** ScoresResponse times */
    times?: (number[]|null);
}

/** Represents a ScoresResponse. */
export class ScoresResponse implements IScoresResponse {

    /**
     * Constructs a new ScoresResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IScoresResponse);

    /** ScoresResponse name. */
    public name: string;

    /** ScoresResponse times. */
    public times: number[];

    /**
     * Creates a new ScoresResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ScoresResponse instance
     */
    public static create(properties?: IScoresResponse): ScoresResponse;

    /**
     * Encodes the specified ScoresResponse message. Does not implicitly {@link ScoresResponse.verify|verify} messages.
     * @param message ScoresResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IScoresResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ScoresResponse message, length delimited. Does not implicitly {@link ScoresResponse.verify|verify} messages.
     * @param message ScoresResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IScoresResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ScoresResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ScoresResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ScoresResponse;

    /**
     * Decodes a ScoresResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ScoresResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ScoresResponse;

    /**
     * Verifies a ScoresResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ScoresResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ScoresResponse
     */
    public static fromObject(object: { [k: string]: any }): ScoresResponse;

    /**
     * Creates a plain object from a ScoresResponse message. Also converts values to other types if specified.
     * @param message ScoresResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ScoresResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ScoresResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ScoresResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of an ArraySortScoreResponse. */
export interface IArraySortScoreResponse {

    /** ArraySortScoreResponse responses */
    responses?: (ISortScoresResponse[]|null);
}

/** Represents an ArraySortScoreResponse. */
export class ArraySortScoreResponse implements IArraySortScoreResponse {

    /**
     * Constructs a new ArraySortScoreResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IArraySortScoreResponse);

    /** ArraySortScoreResponse responses. */
    public responses: ISortScoresResponse[];

    /**
     * Creates a new ArraySortScoreResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ArraySortScoreResponse instance
     */
    public static create(properties?: IArraySortScoreResponse): ArraySortScoreResponse;

    /**
     * Encodes the specified ArraySortScoreResponse message. Does not implicitly {@link ArraySortScoreResponse.verify|verify} messages.
     * @param message ArraySortScoreResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IArraySortScoreResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ArraySortScoreResponse message, length delimited. Does not implicitly {@link ArraySortScoreResponse.verify|verify} messages.
     * @param message ArraySortScoreResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IArraySortScoreResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ArraySortScoreResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ArraySortScoreResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ArraySortScoreResponse;

    /**
     * Decodes an ArraySortScoreResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ArraySortScoreResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ArraySortScoreResponse;

    /**
     * Verifies an ArraySortScoreResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ArraySortScoreResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ArraySortScoreResponse
     */
    public static fromObject(object: { [k: string]: any }): ArraySortScoreResponse;

    /**
     * Creates a plain object from an ArraySortScoreResponse message. Also converts values to other types if specified.
     * @param message ArraySortScoreResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ArraySortScoreResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ArraySortScoreResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ArraySortScoreResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of an ArrayScoresResponse. */
export interface IArrayScoresResponse {

    /** ArrayScoresResponse responses */
    responses?: (IScoresResponse[]|null);
}

/** Represents an ArrayScoresResponse. */
export class ArrayScoresResponse implements IArrayScoresResponse {

    /**
     * Constructs a new ArrayScoresResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IArrayScoresResponse);

    /** ArrayScoresResponse responses. */
    public responses: IScoresResponse[];

    /**
     * Creates a new ArrayScoresResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ArrayScoresResponse instance
     */
    public static create(properties?: IArrayScoresResponse): ArrayScoresResponse;

    /**
     * Encodes the specified ArrayScoresResponse message. Does not implicitly {@link ArrayScoresResponse.verify|verify} messages.
     * @param message ArrayScoresResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IArrayScoresResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ArrayScoresResponse message, length delimited. Does not implicitly {@link ArrayScoresResponse.verify|verify} messages.
     * @param message ArrayScoresResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IArrayScoresResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ArrayScoresResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ArrayScoresResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ArrayScoresResponse;

    /**
     * Decodes an ArrayScoresResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ArrayScoresResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ArrayScoresResponse;

    /**
     * Verifies an ArrayScoresResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ArrayScoresResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ArrayScoresResponse
     */
    public static fromObject(object: { [k: string]: any }): ArrayScoresResponse;

    /**
     * Creates a plain object from an ArrayScoresResponse message. Also converts values to other types if specified.
     * @param message ArrayScoresResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ArrayScoresResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ArrayScoresResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ArrayScoresResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
