import $ from 'jquery';

const ModuleUser = {
    state: {
        id: "",
        username: "",
        nickname: "",
        profpic: "",
        access: "",
        is_login: false,
        // drive_root_url: "http://192.168.31.203:8066/drive/",
        drive_root_url: "http://192.168.0.16:8066/drive/",
        user_drive_root_url: "",
    },
    getters: {
    },
    mutations: {
        updateUser(state, user){
            state.id = user.id;
            state.username = user.username;
            state.nickname = user.nickname;
            state.profpic = user.faceImg;
            state.access = user.access;
            state.is_login = user.is_login;
            state.user_drive_root_url = state.drive_root_url + user.username + "/";
        },

        logout(state) {
            state.id = "";
            state.username = "";
            state.nickname = "";
            state.profpic = "";
            state.access = "";
            state.is_login = false;
        }
    },
    actions: {
        login(context, data) {
            let user = {
                "username": data.username,
                "password": data.password,
            }

            let userStr = JSON.stringify(user);
            $.ajax({
                // url: "http://192.168.31.203:8066/login/",
                url: "http://192.168.0.16:8066/login/",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: userStr,
                success(resp){
                    const access = resp.data;
                    console.log(resp);
                    console.log(access);
                    
                    $.ajax({
                        // url: "http://192.168.31.203:8066/getUserInfo/",
                        url: "http://192.168.0.16:8066/getUserInfo/",
                        type: "GET",
                        data: {
                            token: access,
                        },
                        headers: {
                            'Authorization': "Bearer " + access,
                        },
                        success(resp) {
                            const user = resp.data;
                            console.log(user); 
                            context.commit("updateUser", {
                                ...user,
                                access: access,
                                is_login: true,
                            });
                            data.success();
                        }
                    });
                },
                error() {
                    data.error();
                },
            });        
        },
    },
    modules: {
      
    }
}

export default ModuleUser;