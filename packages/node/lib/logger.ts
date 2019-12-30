import { stringify, Injector, Injectable, PLATFORM_NAME, Logger } from "@nger/core";
import {
  PRE_LOGGER_ID,
  LOGGER_LAST_TIME
} from "@nger/http";
import { REQUEST_ID } from "@nger/http";
import { createCid } from "./util";

@Injectable()
export class LoggerImpl extends Logger {
  /**
   * 这一次的loggerId
   */
  loggerId: string;
  /**
   * 上一次loggerId
   */
  preLoggerId: string;
  /**
   * 请求id
   */
  requestId: string;
  /**
   * 模块链
   */
  chain: string;
  /**
   * 上次打印时间
   */
  lastTime: number;
  constructor(injector: Injector) {
    super();
    this.preLoggerId = injector.get(PRE_LOGGER_ID, ``);
    this.requestId = injector.get<string>(REQUEST_ID, ``);
    this.lastTime = injector.get<number>(LOGGER_LAST_TIME)
    const platformName = injector.get<string>(PLATFORM_NAME, ``);
    this.chain = `${platformName}.${getInjectorChain(injector).join('.')}`;
    this.loggerId = createCid(JSON.stringify({
      preLoggerId: this.preLoggerId,
      requestId: this.requestId,
      chain: this.chain
    }));
    injector.setStatic([{
      provide: LOGGER_LAST_TIME,
      useValue: new Date().getTime()
    }, {
      provide: PRE_LOGGER_ID,
      useValue: this.loggerId
    }]);
  }
  log(msg: any, ...args: any[]) {
    msg = stringify(msg);
    console.log(msg, this);
  }
  info(msg: any, ...args: any[]) {
    msg = stringify(msg);
    console.log(msg, this);
  }
  warn(msg: any, ...args: any[]) {
    msg = stringify(msg);
    console.log(msg, this);
  }
  debug(msg: any, ...args: any[]) {
    msg = stringify(msg);
    console.log(msg, this);
  }
  error(msg: any, ...args: any[]) {
    msg = stringify(msg);
    console.log(msg, this);
  }
  verbose(msg: any, ...args: any[]) {
    msg = stringify(msg);
    console.log(msg, this);
  }
}

function getInjectorChain(injector: Injector): string[] {
  let chain: string[] = [];
  if (injector.scope === 'root') return chain;
  if (injector.parent) {
    chain.push(...getInjectorChain(injector.parent))
  }
  chain.push(injector.source || '')
  return chain;
}