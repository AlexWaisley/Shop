import { UserLoginRequest, UserRegisterRequest, UserPasswordUpdateRequest, UserUpdateInfoRequest, User } from "@models";
import apiInstance from "./apiInstance";

export const login = async (userLoginRequest: UserLoginRequest): Promise<User | null> => {
    try {
        const { data, status } = await apiInstance.post(`/login`, userLoginRequest);

        console.log('[api]', 'User valid status:', status);
        return data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const register = async (userRegisterRequest: UserRegisterRequest): Promise<User | null> => {
    try {
        const { data, status } = await apiInstance.post(`/register`, userRegisterRequest);
        console.log('[api]', 'User valid status:', status);
        return data;
    } catch (e) {
        console.log(e);
        return null;
    }
};


export const updatePassword = async (userPasswordUpdateRequest: UserPasswordUpdateRequest): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.post(`/user/password`, userPasswordUpdateRequest);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

export const updateInfo = async (userUpdateInfoRequest: UserUpdateInfoRequest): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.post(`/user/info`, userUpdateInfoRequest);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};