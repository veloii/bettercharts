"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUser = async (client) => {
    const studentInfo = await client.getStudentInfo();
    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let user = {};
    user.student = studentInfo;
    if (studentInfo.display_homework)
        user.homework = await client.listHomeworks();
    if (studentInfo.display_behaviour)
        user.behaviour = await client.getBehaviour();
    if (studentInfo.display_activity)
        user.activity = await client.getActivity();
    if (studentInfo.display_detentions)
        user.detentions = await client.getDetentions();
    if (studentInfo.display_announcements)
        user.announcements = await client.listAnnouncements();
    if (studentInfo.display_timetable)
        user.lessons = await client.getLessons({
            date,
        });
    if (studentInfo.display_event_badges)
        user.awards = await client.getBadges();
    return user;
};
exports.default = getUser;
