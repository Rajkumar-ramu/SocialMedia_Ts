import { Interceptor, InterceptorInterface, Action } from "routing-controllers";

@Interceptor()
export class LogingInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    console.log(`Action: ${action.request.method} ${action.request.url}`);
    console.log(`Response: ${JSON.stringify(content)}`);
    return {
      data: content,
      timestamp: new Date().toISOString()
    };
  }
}