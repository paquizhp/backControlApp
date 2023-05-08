const db = require("../models");
const Joi = require('joi');
const mongoose = require("mongoose");
const Pay = db.pay;

exports.payWorker = async (req, res) => {
  console.log(req.body);
  // Validación de datos
  const schema = Joi.object({
    job: Joi.string().required(),
    date: Joi.date().required(),
    price: Joi.number().required(),
    worker: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }
  // Creación del pago
  const pay = new Pay({
    job: req.body.job,
    date: new Date(req.body.date),
    price: req.body.price,
    worker: req.body.worker
  });

  try{
    const savedPay = await pay.save();
    return res.status(201).send({ id: savedPay._id, message: 'Pay successfully!' });

  }catch(err){
    return res.status(500).send({ message: `Error while saving pay: ${err.message}` });

  }
};

exports.currentWeek = async (req, res) => {
  console.log(req.body);
  const fechaInicio = new Date(req.body.firstDay);
  const fechaFin =new Date( req.body.lastDay);
  const id = new mongoose.Types.ObjectId(req.body.worker);
  // creamos dos lista para los dos trabajos existentes.
  try{
    const job1 = await Pay.find({ date: { $gte: fechaInicio, $lte: fechaFin }, worker: id, job: '1' });
    const job2 = await Pay.find({ date: { $gte: fechaInicio, $lte: fechaFin }, worker: id, job: '2' });
    const data= [job1, job2];
    res.status(200).json({ data });
  }catch(error){
    if (error.name === 'CastError') {
      res.status(400).json({ message: 'Las fechas deben estar en el formato correcto.'+ error });
    } else {
      res.status(500).json({ message: 'Error al buscar los pagos.' });
    }

  }
};




