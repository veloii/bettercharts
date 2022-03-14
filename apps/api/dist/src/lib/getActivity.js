"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getActivity = async (client, dateStart, dateEnd) => {
    try {
        if (dateStart && dateEnd) {
            return await client.getActivity({
                from: dateStart,
                to: dateEnd,
            });
        }
        else {
            return await client.getActivity();
        }
    }
    catch {
        return null;
    }
};
exports.default = getActivity;
