"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getHomework = async (client, dateStart, dateEnd) => {
    try {
        if (dateStart && dateEnd) {
            return await client.listHomeworks({
                fromDate: dateStart,
                toDate: dateEnd,
            });
        }
        else {
            return await client.listHomeworks();
        }
    }
    catch {
        return null;
    }
};
exports.default = getHomework;
