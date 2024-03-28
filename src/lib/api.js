export default {
    defaulteApi: {
        host: import.meta.env.VITE_APP_API_defaulteApi,
        token: true,
        path: {
            categoryList: '/data_platform/get_info_group_list/', //配置分类列表
        }
    }
};