<template>
    <!--  <div id="app">-->
    <div id="container">
        <!--    <img alt="Vue logo" src="./assets/logo.png">-->
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <div id="show">
            <table v-if="selected==1" :table-date="json1"></table>
            <LineGraph v-if="selected!=1" ref="child" :content="c"></LineGraph>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    import table from "./table";
    //import json2 from "../../2.json"
    const json2_type = ['cpu', 'disk', 'memory', 'net']
    var url = "http://10.144.5.128:5000/";
    let json1, json2,cs

    function getJson(that) {
        Axios.get(url).then(response => {
            json1 = response.data
            that.json1 = json1
        }).catch((error) => {
            window.console.log(error);
        });
        Axios.get(url + 'detail').then(response => {
            json2 = response.data
            cs = []
            for (var j = 0; j < json2_type.length; j++) {
                let temp = json2[json2_type[j]];
                let content = {
                    TV: [], TVE: [], name: json2_type[j]
                };
                content.state = json2[json2_type[j] + '_stat']

                for (var i = 0; i < temp.length; i++) {
                    content.TV.push([i, temp[i][0]]);
                    if (temp[i][2] == 1) {
                        content.TVE.push([i, temp[i][0]])
                    }
                }
                cs.push(content)
            }
            that.c = cs[that.selected-2]
        }).catch((error) => {
            window.console.log(error);
        })
    }
    export default {
        name: 'home',
        components: {
            LineGraph,
            table,
        },
        data: function () {
            return {
                c: null,
                json1:null,
                selected: 1
            }
        },
        created(){
          getJson(this)
            this.intervalId = setInterval(() => {
                getJson(this)
            }, 3600)
        },
        methods: {
            handleSelect(index, indexPath) {
                this.selected = index;
                if (index>1) {
                  //this.c = packager(json2, json2_type[index - 2])
                  this.c = cs[index-2]
                }
                else{
                  this.json1 = json1
                }
            }
        }
    }
</script>

<style>
    #container {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    #menu {
        width: 20%;
    }

    #show {
        width: 100%;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
