import * as Yup from "yup";
import { get, set, forEach } from "lodash";

const flightSchema = Yup.object().shape({
  airportFrom: Yup.string().required("Airport from is required"),
  airportTo: Yup.string()
    .required("Airport to is required")
    .test({
      name: "validator-booking-place",
      test: function (value) {
        const airportFrom = this.resolve(Yup.ref("airportFrom"));
        if (value === airportFrom)
          return this.createError({
            message: `Airport To must different from airport from`,
            path: "airportTo",
          });
        return true;
      },
    }),
  dateStart: Yup.date().nullable().required("Start date is required"),
  dateEnd: Yup.date().nullable().required("End date is required"),
  vipSeats: Yup.string().required("Vip seat is required"),
  normalSeats: Yup.string().required("Normal seat is required"),
  vipPrice: Yup.string().required("Vip price is required"),
  normalPrice: Yup.string().required("Normal price is required"),
});

const airportSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
});

const middleAirportSchema = Yup.object().shape({
  flightCode: Yup.string().required("Flight code is required"),
  timeDelay: Yup.string().required("Time delay is required"),
});

const bookTicketSchema = Yup.object().shape({
  normalSeats: Yup.string()
    .nullable()
    .test({
      name: "validator-booking-seats",
      test: function (value) {
        const vipSeats = this.resolve(Yup.ref("vipSeats"));
        if (!value && !vipSeats)
          return this.createError({
            message: `Both normal seats and vip seats must not be empty`,
            path: "normalSeats",
          });
        return true;
      },
    }),
});

const schema = {
  flightSchema,
  airportSchema,
  middleAirportSchema,
  bookTicketSchema,
};

const validateData = (validateChoose, formValue, callback) => {
  return new Promise((resolve, reject) => {
    schema[validateChoose]
      .validate(formValue, { abortEarly: false })
      .then(() => {
        callback && callback(formValue);
        resolve();
      })
      .catch((err) => {
        console.log("err: ", err);
        const listError = get(err, "inner");
        let errors = {};
        forEach(listError, (error) => {
          set(errors, error.path, get(error, "errors[0]"));
        });
        reject(errors);
      });
  });
};

export default validateData;
