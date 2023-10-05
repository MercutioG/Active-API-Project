// Router!!!

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Users = require('./users');


// router.get('/get_tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find();
//         res.status(200).json(tasks);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.post('/create_task', async (req, res) => {
//     const { Task_Name, Task_Description, Due_Date } = req.body;
//     console.log(req.body);

//     // Get current date in the format "Month day, year"
//     const currentDate = new Date();
//     const formattedDate = currentDate.toLocaleDateString('en-US', {
//         month: 'long',
//         day: 'numeric',
//         year: 'numeric'
//     });

//     try {
//         const task = new Task({
//             Task_Name,
//             Task_Description,
//             Start_Date: formattedDate,
//             Due_Date,
//             Finished: false
//         });

//         await task.save();
//         res.status(200).json(task);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// router.delete('/delete_task/:taskId', async (req, res) => {
//     try {
//         const { taskId } = req.params;
//         const result = await Task.findByIdAndRemove(taskId);

//         if (!result) {
//             return res.status(404).json({ error: 'Task not found' });
//         }

//         res.status(200).json({ message: 'Task successfully deleted' });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// router.put('/update_task/:taskId', async (req, res) => {
//     try {
//         const taskId = req.params.taskId;
//         const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, { new: true });

//         if (!task) {
//             return res.status(404).json({ error: 'Task not found' });
//         }

//         res.status(200).json(task);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

//////////////// [The above are examples of past code and the coding format we can use.]


router.post('/create_account', async (req, res) => {
    const { Username, Unhashed_Password, Email } = req.body;
    console.log(req);
    const saltRounds = 10;

    // Get current date in the format "Month day, year"
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    try {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) {
                    reject("Salting issue");
                } else {
                    bcrypt.hash(Unhashed_Password, salt, function (err, hash) {
                        if (err) {
                            reject("Not Hashable");
                        } else {
                            resolve(hash);
                        }
                    });
                }
            });
        });

        const User = new Users({
            Username,
            Password: hashedPassword,
            Email,
            Creation_Date: formattedDate,
        });

        await User.save();
        res.status(200).json(User);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;


