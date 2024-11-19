import { deleteCalendar, fetchCalendar, generateCalendar, updateCalendar } from "../controllers/calendarControllers.js";
import { Router } from "express";

const calenderrouter = Router();

calenderrouter.post('/create-schedule',generateCalendar);
router.get('/all-schedules', fetchCalendar)
router.patch('/update-schedule/:id', updateCalendar)
router.delete('/delete-schedule/:id',deleteCalendar)

export default router;