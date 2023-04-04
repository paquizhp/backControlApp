const db = require("../models");
const Pay = db.pay;

exports.payWorker = (req, res) => {
  const pay = new Pay({
    job: req.body.job,
    date: req.body.date,
    price: req.body.price,
    worker: req.body.id
  });
  pay.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Pay successfully!" });
  });
};

exports.currentWeek = async (req, res) => {
  const fechaInicio = new Date(req.body.firstDay);
  const fechaFin =new Date( req.body.lastDay);
  const id = parseInt(req.body.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'El ID del trabajador debe ser un valor numérico.' });
    return;
  }

  try{
    const data = await Pay.find({ date: { $gte: fechaInicio, $lte: fechaFin }, worker: id });
    res.status(200).json({ data });
  }catch(eror){
    if (error.name === 'CastError') {
      res.status(400).json({ message: 'Las fechas deben estar en el formato correcto.' });
    } else {
      res.status(500).json({ message: 'Error al buscar los pagos.' });
    }

  }
};




