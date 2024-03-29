import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import {
  makeCreateHolidayController,
  makeDeleteHolidayController,
  makeGetHolidaysController
} from "../factories/controllers";

export default (router: Router) => {
  router.get("/holiday", expressRouteAdapter(makeGetHolidaysController()))
  router.get("/holiday/:holidayId", expressRouteAdapter(makeGetHolidaysController()))
  router.post("/holiday", expressRouteAdapter(makeCreateHolidayController()))
  router.delete("/holiday/:holidayId", expressRouteAdapter(makeDeleteHolidayController()))
}
