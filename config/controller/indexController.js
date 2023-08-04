const Car = require('../../model/car');

class IndexController {
    async index(req, res, next) {
        await Car.find()
            .then((cars) => {
                res.render('index', { title: 'Cars Management', cars })
            })
            .catch((error) => {
                next(error)
            })
    }

    async addCar(req, res, next) {

        var car = new Car(
            {
                carName: req.body.carName,
                images: req.body.images,
                quantity: req.body.quantity,
                price: req.body.price,
                date: req.body.date,

            })

        try {
            await car.save()
                .then((result) => {
                    res.redirect('/')
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    res.json(error)
                });
        } catch (err) {
            console.error(err);
        }
    }

    async editCar(req, res, next) {
        try {
            await Car.updateOne({ _id: req.params.id },
                {
                    carName: req.body.carName,
                    images: req.body.images,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    date: req.body.date,
                })
                .then((result) => {
                    console.log('Car edited:', result);
                    res.redirect('/')
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    res.json(error)
                });
        } catch (err) {
            console.error(err);
        }
    }


    async deleteCar(req, res, next) {
        const currentCar = await Car.findById(req.params.id)
        await Car.deleteOne({ _id: req.params.id })
            .then(() => {
                return res.redirect('/')
            })
            .catch(next)
    }

    async searchCar(req, res, next) {
        var keyword_search = req.query.keyword_search
        var query = Car.where({
            $or:[
                {carName:{$regex:keyword_search, $options:'i'}},
                {quantity:{$regex:keyword_search, $options:'i'}},
                {price:{$regex:keyword_search, $options:'i'}},
                {date:{$regex:keyword_search, $options:'i'}},
            ]
        })

        await Car.find(query)
        .then((car)=>{
            var cars = car.map(function (car) {
                return {
                    _id: car._id,
                    carName: car.carName,
                    images: car.images,
                    quantity:car.quantity,
                    price: car.price,
                    date: car.date,
                }
            })
            console.log(cars);
            res.render('index', { title: 'Cars Management', cars })
        })
        .catch((error)=>{
            next(error)
        })

    }

    async getCar(req, res, next) {
        await Car.find()
            .then((cars) => {
                res.json(cars)
            })
            .catch((error) => {
                next(error)
            })
    }

}

module.exports = new IndexController;