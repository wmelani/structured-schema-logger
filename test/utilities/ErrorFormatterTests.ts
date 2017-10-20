import "mocha";
import {expect} from "chai";
import ErrorFormatter from "../../src/utilities/ErrorFormatter";

describe("Error Formatter", () => {

    it("Can Format an Error object with a message", () => {
        const sampleMessage = "blah blah blah";
        const error = new Error(sampleMessage);
        const formattedError = ErrorFormatter.format(error);
        expect(formattedError).to.not.be.null;
        expect(formattedError['error-stack-trace']).to.be.not.equals(undefined);
        expect(formattedError['error-message']).to.be.equals(sampleMessage);
        expect(formattedError['error-type']).to.be.equals(Error.prototype.name);

        //TODO: WIP
        expect(formattedError['error-line-number']).to.be.equals(undefined);
        expect(formattedError['error-column-number']).to.be.equals(undefined);
        expect(formattedError['error-file-name']).to.be.equals(undefined);
    });

    it("Can Format an Error object without a message", () => {
        const error = new Error();
        const formattedError = ErrorFormatter.format(error);
        expect(formattedError).to.not.be.null;
        expect(formattedError['error-stack-trace']).to.be.not.equals(undefined);
        expect(formattedError['error-message']).to.be.equals(null);
        expect(formattedError['error-type']).to.be.equals(Error.prototype.name);

        //TODO: WIP
        expect(formattedError['error-line-number']).to.be.equals(undefined);
        expect(formattedError['error-column-number']).to.be.equals(undefined);
        expect(formattedError['error-file-name']).to.be.equals(undefined);
    });

    it("Can Format an Error object with a derived Error Type", () => {
        const error = new TypeError();
        const formattedError = ErrorFormatter.format(error);
        expect(formattedError).to.not.be.null;
        expect(formattedError['error-stack-trace']).to.be.not.equals(undefined);
        expect(formattedError['error-message']).to.be.equals(null);
        expect(formattedError['error-type']).to.be.equals(TypeError.prototype.name);

        //TODO: WIP
        expect(formattedError['error-line-number']).to.be.equals(undefined);
        expect(formattedError['error-column-number']).to.be.equals(undefined);
        expect(formattedError['error-file-name']).to.be.equals(undefined);
    });

    it("Can Format an Error object with a custom Error Type", () => {

        class CustomErrorType extends Error {
            constructor(message?: string) {
                super(message);
            }
        }

        const error = new CustomErrorType();
        const formattedError = ErrorFormatter.format(error);
        expect(formattedError).to.not.be.null;
        expect(formattedError['error-stack-trace']).to.be.not.equals(undefined);
        expect(formattedError['error-message']).to.be.equals(null);
        expect(formattedError['error-type']).to.be.equals(CustomErrorType.prototype.name);

        //TODO: WIP
        expect(formattedError['error-line-number']).to.be.equals(undefined);
        expect(formattedError['error-column-number']).to.be.equals(undefined);
        expect(formattedError['error-file-name']).to.be.equals(undefined);
    })
});