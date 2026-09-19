const { fetchExpanses, addExpenses, deleteExpanses } = require('../Controllers/ExpenseController')

const router = require('express').Router()

router.get("/",fetchExpanses)
router.post("/",addExpenses)
router.delete("/:expanseId",deleteExpanses)

module.exports = router