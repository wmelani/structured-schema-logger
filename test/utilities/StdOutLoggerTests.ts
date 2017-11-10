import "mocha";
import {expect} from "chai";
import * as Sinon from "sinon";
import StdOutLogger from "../../src/StdOutLogger";
import {ILoggingEntry} from "../../src/ILoggingEntry";
import uuid = require("uuid");


/*
error(entry: ILoggingEntry, error: Error): void {
    const errorData = ErrorFormatter.format(error);

    const newEntry = {
      // before to allow overriding of schema
      schema: "error",
      ...errorData,
      ...entry,
      // last to force override of error
      severity: "error"
    };
    this.log(<ILoggingEntry>newEntry);
  }
  constructor(private readonly defaults: {}) {}
  log(entry: ILoggingEntry): void {
    const metadata = {
      time: new Date()
    };
    const message = { ...metadata, ...this.defaults, ...entry };
    const messageJson = JSON.stringify(message);
    const line = `${messageJson}${EOL}`;

    if (entry.severity === "error") {
      process.stderr.write(line);
    }
    process.stdout.write(line);
  }
 */
describe("Std Out Logger", () => {

    let sandbox: Sinon.SinonSandbox = null;
    let stdoutSpy: Sinon.SinonSpy = null;
    let stdErrSpy: Sinon.SinonSpy = null;

    beforeEach(() => {
        sandbox = Sinon.sandbox.create();
        stdoutSpy = sandbox.spy(process.stdout, 'write');
        stdErrSpy = sandbox.spy(process.stderr, 'write');
    });

    afterEach(() => {
        sandbox.restore();
    });
    describe("constructor", () => {
        it("creates successfully", () => {
            new StdOutLogger();
        });
    });
    describe("log", () => {
        it("sets a time on the response", () => {
            const logger = new StdOutLogger();
            logger.log(<ILoggingEntry> {
                message: 'ABC',
                severity: 'info'
            });
            expect(stdErrSpy.called).to.be.false;
            expect(stdoutSpy.callCount).to.be.equals(1);
            expect(stdoutSpy.args[0].length).to.be.equals(1);
            const envelope = JSON.parse(stdoutSpy.args[0][0]);
            expect(envelope.time).to.be.not.undefined;
            expect(Date.parse(envelope.time)).to.be.not.equals(NaN);
        });
        it("writes to stderr if an error", () => {

        });
        it("writes to stdout if info", () => {
            const severity = 'info';
            const entry = <ILoggingEntry> {
                message: 'ABC',
                severity: severity,
                requestId: uuid.v4(),
                componentId: 'blah',
                schema: 'simple'
            };
            const logger = new StdOutLogger();
            logger.log(entry);
            expect(stdErrSpy.called).to.be.false;
            expect(stdoutSpy.callCount).to.be.equals(1);
            expect(stdoutSpy.args[0].length).to.be.equals(1);
        });
        it("writes to stdout if warn", () => {

        });
        it("writes to stdout if debug", () => {

        });
        it("writes to stdout if trace", () => {

        });
        it("merges on constructor defaults before the passed in parameter", () => {

        });
        it("merges on constructor defaults before the passed in parameter", () => {

        });
    });

});