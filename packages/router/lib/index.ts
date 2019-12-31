import { Module, ModuleWithProviders } from "@nger/core";
import { Router } from "./router";

@Module()
export class RouterModule {
    static forRoot(routes: Router[]): ModuleWithProviders {
        return {
            ngModule: RouterModule,
            providers: []
        }
    }
    static forFeature(routes: Router[]): ModuleWithProviders {
        return {
            ngModule: RouterModule,
            providers: []
        }
    }
}
