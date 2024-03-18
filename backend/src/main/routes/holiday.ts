import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeCreateHolidayController } from "../factories/controllers";

export default (router: Router) => {
  router.post("/holiday", expressRouteAdapter(makeCreateHolidayController()))
}
