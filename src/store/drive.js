import $ from 'jquery';

const ModuleDrive = {
    state: {
        username: "",
        homeDir: "",
        homeUrl: "http://192.168.100.7:8066/drive/"
    },
    getters: {
    },
    mutations: {

    },
    actions: {
        getHome(data) {
            let username = data.username;
            // console.log(context);
            $.ajax({
                url: "http://192.168.100.7:8066/drive/" + username,
                type: "GET",
                success(resp){
                    console.log(resp);
                },
                error(){
                    console.log("http home dir failed");  
                }
            });
        }
    },
    modules: {
    }
}

export default ModuleDrive;