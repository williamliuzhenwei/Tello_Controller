document.addEventListener("DOMContentLoaded",(event) => {

    var dataURL = "http://0.0.0.0:8000/get_telemetry"

    function showError(err){
        console.log(err)
    }
    
    function update(data){
        var roll_1 = data.pitch
        var tello_1 = document.querySelector("#pitch")
        var roll_1 = data.roll
        var tello_1 = document.querySelector("#roll")
        var yaw_1 = data.yaw
        var tello_2 = document.querySelector("#yaw")
        var vgx_1 = data.vgx
        var tello_3 = document.querySelector("#vgx")
        var vgy_1 = data.vgy
        var tello_4 = document.querySelector("#vgy")
        var vgz_1 = data.vgz
        var tello_5 = document.querySelector("#vgz")
        var templ_1 = data.templ
        var tello_6 = document.querySelector("#templ")
        var temph_1 = data.temph
        var tello_7 = document.querySelector("#temph")
        var tof_1 = data.tof
        var tello_8 = document.querySelector("#tof")
        var h_1 = data.h
        var tello_9 = document.querySelector("#h")
        var bat_1 = data.bat
        var tello_10 = document.querySelector("#bat")
        var baro_1 = data.baro
        var tello_11 = document.querySelector("#baro")
        var time_1 = data.time
        var tello_12 = document.querySelector("#time")
        var agx_1 = data.agx
        var tello_13 = document.querySelector("#agx")
        var agy_1 = data.agy
        var tello_14 = document.querySelector("#agy")
        var agz_1 = data.agz
        var tello_15 = document.querySelector("#agz")

        tello_15.setAttribute('data-count',agz_1)
        tello_14.setAttribute('data-count',agy_1)
        tello_13.setAttribute('data-count',agx_1)
        tello_12.setAttribute('data-count',time_1)
        tello_11.setAttribute('data-count',baro_1)
        tello_10.setAttribute('data-count',bat_1)
        tello_9.setAttribute('data-count',h_1)
        tello_8.setAttribute('data-count',tof_1)
        tello_7.setAttribute('data-count',temph_1)
        tello_6.setAttribute('data-count',templ_1)
        tello_5.setAttribute('data-count',vgz_1)
        tello_4.setAttribute('data-count',vgy_1)
        tello_3.setAttribute('data-count',vgx_1)
        tello_2.setAttribute('data-count',yaw_1)
        tello.setAttribute('data-count',pitch_1)
        tello_1.setAttribute('data-count',roll_1)
    }

    setInterval( ()=>{
        fetch(dataURL)
            .then(response=>response.json())
            .then(update)
            .catch(showError)
    } 
        ,3000)




    document.querySelector('#Takeoff').addEventListener("click",function(element){
        var tello_url = "http://0.0.0.0:8000/drone_command/takeoff";
        pas(tello_url)
        element.preventDefault();
    })

    document.querySelector('#plan').addEventListener("click",function(element){
        var det = document.getElementById("detail").value;
        var tello_url = "http://0.0.0.0:8000/flight_plan/" + det;
        pas(tello_url)
        element.preventDefault();
    })

    document.querySelector('#Forward').addEventListener("click",function(element){
        var F_mag = document.getElementById("F_mag").value;
        tello_url = "http://0.0.0.0:8000/drone_command/forward/" + F_mag;
        pas(tello_url)
        element.preventDefault();
    })

    document.querySelector('#Land').addEventListener("click",function(element){
        var tello_url = "http://0.0.0.0:8000/drone_command/land";
        pas(tello_url)
        element.preventDefault();
    })

    document.querySelector('#Backward').addEventListener("click",function(element){
        var F_mag = document.getElementById("F_mag").value;
        tello_url = "http://0.0.0.0:8000/drone_command/backward/" + F_mag;
        pas(tello_url)
        element.preventDefault();
    })

    document.querySelector('#Move_up').addEventListener("click",function(element){
        var F_mag = document.getElementById("F_mag").value;
        tello_url = "http://0.0.0.0:8000/drone_command/up/" + F_mag;
        pas(tello_url)
        element.preventDefault();
    })

    document.querySelector('#Move_down').addEventListener("click",function(element){
        var F_mag = document.getElementById("F_mag").value;
        tello_url = "http://0.0.0.0:8000/drone_command/down/" + F_mag;
        pas(tello_url)
        element.preventDefault();
    })

    document.querySelector('#Turn_left').addEventListener("click",function(element){
        var F_mag = document.getElementById("F_mag").value;
        tello_url = "http://0.0.0.0:8000/drone_command/ccw/" + F_mag;
        pas(tello_url)
        element.preventDefault();
    })

    document.querySelector('#Backward').addEventListener("click",function(element){
        var F_mag = document.getElementById("F_mag").value;
        tello_url = "http://0.0.0.0:8000/drone_command/back/" + F_mag;
        pas(tello_url)
        element.preventDefault();
    })

    document.querySelector('#Turn_right').addEventListener("click",function(element){
        var F_mag = document.getElementById("F_mag").value;
        tello_url = "http://0.0.0.0:8000/drone_command/cw/" + F_mag;
        pas(tello_url)
        element.preventDefault();
    })
    
    function pas(url){
        tello_url = url
        fetch(tello_url)
            .then(response=>response.json())
            // .then(update)
            .catch(showError)
    }

});