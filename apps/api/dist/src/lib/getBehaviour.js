"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getBehaviour = async (client, dateStart, dateEnd) => {
    try {
        if (dateStart && dateEnd) {
            return await client.getBehaviour({
                from: dateStart,
                to: dateEnd,
            });
        }
        else {
            return await client.getBehaviour();
        }
    }
    catch {
        return null;
    }
};
exports.default = getBehaviour;
