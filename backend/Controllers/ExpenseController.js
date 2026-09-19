const UserModel = require("../Models/User")

const addExpenses = async (req, res) => {
  const body = req.body
  const { _id } = req.user
  //console.log(body,_id)

  try {
    const userData = await UserModel.findByIdAndUpdate(
      _id, // user _id
      {
        $push: { expanses: body }
      },
      { new: true } // for returning the updated document , updated data return krta hai
    )
    return res.status(200).json({ message: "expense added successfully", success: true, data: userData?.expanses }) //?.expanses
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false,
      error: error
    })
  }
}


const fetchExpanses = async (req, res) => {
  const body = req.body
  const { _id } = req.user
  //console.log(body,_id)

  try {
    const userData = await UserModel.findById(_id).select("expanses")
    return res.status(200).json({ message: "expense fetched successfully", success: true, data: userData })
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false,
      error: error
    })
  }

}

const deleteExpanses = async (req, res) => {
  const { _id } = req.user
  const { expanseId } = req.params
  //console.log(body,_id)

  try {
    const userData = await UserModel.findByIdAndUpdate(
      _id,
      {
        $pull: { expanses: { _id: expanseId } }
      },
      { new: true }
    )
    return res.status(200).json({ message: "expense deleted successfully", success: true, data: userData })
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false,
      error: error
    })
  }
}

module.exports = { addExpenses, fetchExpanses, deleteExpanses }