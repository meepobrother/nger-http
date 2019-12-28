import { stringify, Injector, Injectable, PLATFORM_NAME, Logger } from "@nger/core";
import {
  PRE_LOGGER_ID,
  LOGGER_MODULE_CHAIN,
  LOGGER_METHOD_NAME,
  LOGGER_LAST_TIME
} from "./token";
import { REQUEST_ID } from "@nger/http";

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
   * 服务名
   */
  platformName: string;
  /**
   * 模块链
   */
  moduleChain: string;
  /**
   * 方法名称
   */
  methodName: string;
  /**
   * 上次打印时间
   */
  lastTime: number;
  constructor(injector: Injector) {
    super();
    this.preLoggerId = injector.get(PRE_LOGGER_ID);
    this.requestId = injector.get<string>(REQUEST_ID);
    this.platformName = injector.get<string>(PLATFORM_NAME);
    this.moduleChain = injector.get<string>(LOGGER_MODULE_CHAIN);
    this.methodName = injector.get<string>(LOGGER_METHOD_NAME);
    this.lastTime = injector.get<number>(LOGGER_LAST_TIME);
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
