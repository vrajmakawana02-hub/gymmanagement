const Membership = require('../Modals/membership');


exports.addMembership = async (req, res) => {

    try {
        const { months, price } = req.body;
        const membership = await Membership.findOne({ gym: req.gym._id, months });
        if (membership) {
            membership.price = price
            await membership.save();
             res.status(200).json({
                message: "Updated Successfully"

            })
        } else {
            const nuwMembership = new Membership({ price, months, gym: req.gym._id });
            await nuwMembership.save();
             res.status(200).json({
                message: "Added Successfully",
                data:nuwMembership
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Server Error"
        })
    }

}

exports.getmembership = async (req, res) => {
    try {
        const loggedInId = req.gym._id;
        const membership= await Membership.find({gym:loggedInId});
        res.status(200).json({
            message:"Membership Fetched Successfully",
            membership: membership
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Server Error"
        })
    }
}