import actionNames from './actionNames';

function userChangeContent(specifiedName) {
    return function (data) {
        return {
            type: actionNames[`USER_CHANGE_${specifiedName}`],
            payload: data,
        };
    };
}

export const changejobTitle = userChangeContent('JOB_TITLE');
export const changecompanyName = userChangeContent('COMPANY_NAME');
export const changejobPosition = userChangeContent('JOB_POSITION');
export const changeproductDesc = userChangeContent('PRODUCT_DESC');
export const changefullName = userChangeContent('FULL_NAME');
