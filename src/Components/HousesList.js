import React, {useEffect, useState} from 'react';
import {Table, Tag, Radio, Button, Image, Input, Select, Divider, Row, Col, Span, message, Alert, Space} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {HouseListAxios} from './axiosApi'
import { defaultIconPrefixCls } from 'antd/lib/config-provider';
// import { UploadOutlined } from '@ant-design/icons';
// import { Text, StyleSheet } from "react-native";


const { Option } = Select;

const housesListUrl = 'house/getHouses'
const xToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWUxNDA1NzM0Mzg1MDAxZjE5MDg2NiIsInJvbGVzIjpbMiwzLDRdLCJpYXQiOiIyMDIyLTAzLTEzVDEzOjEyOjI5LjM5N1oifQ.i24MARH_Mc_H8BBl-S2LV0ibAy9KaTSjkCuoI648jvM"

const HousesList = () => {
    const cityOptions = [{ value: '縣市不限' }, { value: '台北市' }, { value: '新北市' }, { value: '桃園市' }, { value: '台中市' }, { value: '台南市' }, { value: '高雄市' }, { value: '基隆市' }, { value: '新竹市' }, { value: '嘉義市' }, { value: '新竹縣' }, { value: '苗栗縣' }, { value: '彰化縣' }, { value: '南投縣' }, { value: '雲林縣' }, { value: '嘉義縣' }, { value: '屏東縣' }, { value: '宜蘭縣' }, { value: '花蓮縣' }, { value: '臺東縣' }, { value: '澎湖縣' }, { value: '金門縣' }, { value: '連江縣' }];
    const taipeiAreaOptions = [{ value: '區域不限' },{ value: '中正區'},{ value: '大同區'},{ value: '中山區'},{ value: '松山區'},{ value: '大安區'},{ value: '萬華區'},{ value: '信義區'},{ value: '士林區'},{ value: '北投區'},{ value: '內湖區'},{ value: '南港區'},{ value: '文山區'}]
    const newTaipeiAreaOptions = [{ value: '區域不限' },{ value: '板橋區'},{ value: '新莊區'},{ value: '中和區'},{ value: '永和區'},{ value: '土城區'},{ value: '樹林區'},{ value: '三峽區'},{ value: '鶯歌區'},{ value: '三重區'},{ value: '蘆洲區'},{ value: '五股區'},{ value: '泰山區'},{ value: '林口區'},{ value: '八里區'},{ value: '淡水區'},{ value: '三芝區'},{ value: '石門區'},{ value: '金山區'},{ value: '萬里區'},{ value: '汐止區'},{ value: '瑞芳區'},{ value: '貢寮區'},{ value: '平溪區'},{ value: '雙溪區'},{ value: '新店區'},{ value: '深坑區'},{ value: '石碇區'},{ value: '坪林區'},{ value: '烏來區'}]
    const taoyuanAreaOptions = [{ value: '區域不限' },{ value: '桃園區'},{ value: '中壢區'},{ value: '平鎮區'},{ value: '八德區'},{ value: '楊梅區'},{ value: '蘆竹區'},{ value: '大溪區'},{ value: '龍潭區'},{ value: '龜山區'},{ value: '大園區'},{ value: '觀音區'},{ value: '新屋區'},{ value: '復興區'}]
    const taichungAreaOptions = [{ value: '區域不限' },{ value: '中區'},{ value: '東區'},{ value: '南區'},{ value: '西區'},{ value: '北區'},{ value: '北屯區'},{ value: '西屯區'},{ value: '南屯區'},{ value: '太平區'},{ value: '大里區'},{ value: '霧峰區'},{ value: '烏日區'},{ value: '豐原區'},{ value: '后里區'},{ value: '石岡區'},{ value: '東勢區'},{ value: '新社區'},{ value: '潭子區'},{ value: '大雅區'},{ value: '神岡區'},{ value: '大肚區'},{ value: '沙鹿區'},{ value: '龍井區'},{ value: '梧棲區'},{ value: '清水區'},{ value: '大甲區'},{ value: '外埔區'},{ value: '大安區'},{ value: '和平區'}]
    const tainanAreaOptions = [{ value: '區域不限' },{ value: '中西區'},{ value: '東區'},{ value: '南區'},{ value: '北區'},{ value: '安平區'},{ value: '安南區'},{ value: '永康區'},{ value: '歸仁區'},{ value: '新化區'},{ value: '左鎮區'},{ value: '玉井區'},{ value: '楠西區'},{ value: '南化區'},{ value: '仁德區'},{ value: '關廟區'},{ value: '龍崎區'},{ value: '官田區'},{ value: '麻豆區'},{ value: '佳里區'},{ value: '西港區'},{ value: '七股區'},{ value: '將軍區'},{ value: '學甲區'},{ value: '北門區'},{ value: '新營區'},{ value: '後壁區'},{ value: '白河區'},{ value: '東山區'},{ value: '六甲區'},{ value: '下營區'},{ value: '柳營區'},{ value: '鹽水區'},{ value: '善化區'},{ value: '大內區'},{ value: '山上區'},{ value: '新市區'},{ value: '安定區'}]
    const kaohsiungAreaOptions = [{ value: '區域不限' },{ value: '楠梓區'},{ value: '左營區'},{ value: '鼓山區'},{ value: '三民區'},{ value: '鹽埕區'},{ value: '前金區'},{ value: '新興區'},{ value: '苓雅區'},{ value: '前鎮區'},{ value: '旗津區'},{ value: '小港區'},{ value: '鳳山區'},{ value: '大寮區'},{ value: '鳥松區'},{ value: '林園區'},{ value: '仁武區'},{ value: '大樹區'},{ value: '大社區'},{ value: '岡山區'},{ value: '路竹區'},{ value: '橋頭區'},{ value: '梓官區'},{ value: '彌陀區'},{ value: '永安區'},{ value: '燕巢區'},{ value: '田寮區'},{ value: '阿蓮區'},{ value: '茄萣區'},{ value: '湖內區'},{ value: '旗山區'},{ value: '美濃區'},{ value: '內門區'},{ value: '杉林區'},{ value: '甲仙區'},{ value: '六龜區'},{ value: '茂林區'},{ value: '桃源區'},{ value: '那瑪夏區'}] 
    const keelungAreaOptions = [{ value: '區域不限' },{ value: '仁愛區'},{ value: '中正區'},{ value: '信義區'},{ value: '中山區'},{ value: '安樂區'},{ value: '暖暖區'},{ value: '七堵區'}]
    const hsinchuCityAreaOptions = [{ value: '區域不限' },{ value: '東區'},{ value: '北區'},{ value: '香山區'}]
    const chiayiCityAreaOptions = [{ value: '區域不限' },{ value: '東區'},{ value: '西區'}]
    const hsinchuAreaOptions = [{ value: '區域不限' },{ value: '竹北市'},{ value: '竹東鎮'},{ value: '新埔鎮'},{ value: '關西鎮'},{ value: '湖口鄉'},{ value: '新豐鄉'},{ value: '峨眉鄉'},{ value: '寶山鄉'},{ value: '北埔鄉'},{ value: '芎林鄉'},{ value: '橫山鄉'},{ value: '尖石鄉'},{ value: '五峰鄉'}]
    const miaoliAreaOptions = [{ value: '區域不限' },{ value: '苗栗市'},{ value: '頭份市'},{ value: '竹南鎮'},{ value: '後龍鎮'},{ value: '通霄鎮'},{ value: '苑裡鎮'},{ value: '卓蘭鎮'},{ value: '造橋鄉'},{ value: '西湖鄉'},{ value: '頭屋鄉'},{ value: '公館鄉'},{ value: '銅鑼鄉'},{ value: '三義鄉'},{ value: '大湖鄉'},{ value: '獅潭鄉'},{ value: '三灣鄉'},{ value: '南庄鄉'},{ value: '泰安鄉'}]
    const changhuaAreaOptions = [{ value: '區域不限' },{ value: '彰化市'},{ value: '員林市'},{ value: '和美鎮'},{ value: '鹿港鎮'},{ value: '溪湖鎮'},{ value: '二林鎮'},{ value: '田中鎮'},{ value: '北斗鎮'},{ value: '花壇鄉'},{ value: '芬園鄉'},{ value: '大村鄉'},{ value: '永靖鄉'},{ value: '伸港鄉'},{ value: '線西鄉'},{ value: '福興鄉'},{ value: '秀水鄉'},{ value: '埔心鄉'},{ value: '埔鹽鄉'},{ value: '大城鄉'},{ value: '芳苑鄉'},{ value: '竹塘鄉'},{ value: '社頭鄉'},{ value: '二水鄉'},{ value: '田尾鄉'},{ value: '埤頭鄉'},{ value: '溪州鄉'}]
    const nantouAreaOptions = [{ value: '區域不限' },{ value: '南投市'},{ value: '埔里鎮'},{ value: '草屯鎮'},{ value: '竹山鎮'},{ value: '集集鎮'},{ value: '名間鄉'},{ value: '鹿谷鄉'},{ value: '中寮鄉'},{ value: '魚池鄉'},{ value: '國姓鄉'},{ value: '水里鄉'},{ value: '信義鄉'},{ value: '仁愛鄉'}]
    const yunlinAreaOptions = [{ value: '區域不限' },{ value: '斗六市'},{ value: '斗南鎮'},{ value: '虎尾鎮'},{ value: '西螺鎮'},{ value: '土庫鎮'},{ value: '北港鎮'},{ value: '林內鄉'},{ value: '古坑鄉'},{ value: '大埤鄉'},{ value: '莿桐鄉'},{ value: '褒忠鄉'},{ value: '二崙鄉'},{ value: '崙背鄉'},{ value: '麥寮鄉'},{ value: '臺西鄉'},{ value: '東勢鄉'},{ value: '元長鄉'},{ value: '四湖鄉'},{ value: '口湖鄉'},{ value: '水林鄉'}]
    const chiayiAreaOptions = [{ value: '區域不限' },{ value: '太保市'},{ value: '朴子市'},{ value: '布袋鎮'},{ value: '大林鎮'},{ value: '民雄鄉'},{ value: '溪口鄉'},{ value: '新港鄉'},{ value: '六腳鄉'},{ value: '東石鄉'},{ value: '義竹鄉'},{ value: '鹿草鄉'},{ value: '水上鄉'},{ value: '中埔鄉'},{ value: '竹崎鄉'},{ value: '梅山鄉'},{ value: '番路鄉'},{ value: '大埔鄉'},{ value: '阿里山鄉'}]
    const pingtungAreaOptions = [{ value: '區域不限' },{ value: '屏東市'},{ value: '潮州鎮'},{ value: '東港鎮'},{ value: '恆春鎮'},{ value: '萬丹鄉'},{ value: '長治鄉'},{ value: '麟洛鄉'},{ value: '九如鄉'},{ value: '里港鄉'},{ value: '鹽埔鄉'},{ value: '高樹鄉'},{ value: '萬巒鄉'},{ value: '內埔鄉'},{ value: '竹田鄉'},{ value: '新埤鄉'},{ value: '枋寮鄉'},{ value: '新園鄉'},{ value: '崁頂鄉'},{ value: '林邊鄉'},{ value: '南州鄉'},{ value: '佳冬鄉'},{ value: '琉球鄉'},{ value: '車城鄉'},{ value: '滿州鄉'},{ value: '枋山鄉'},{ value: '霧臺鄉'},{ value: '瑪家鄉'},{ value: '泰武鄉'},{ value: '來義鄉'},{ value: '春日鄉'},{ value: '獅子鄉'},{ value: '牡丹鄉'},{ value: '三地門鄉'}]
    const yilanAreaOptions = [{ value: '區域不限' },{ value: '宜蘭市'},{ value: '頭城鎮'},{ value: '羅東鎮'},{ value: '蘇澳鎮'},{ value: '礁溪鄉'},{ value: '壯圍鄉'},{ value: '員山鄉'},{ value: '冬山鄉'},{ value: '五結鄉'},{ value: '三星鄉'},{ value: '大同鄉'},{ value: '南澳鄉'}]
    const hualienAreaOptions = [{ value: '區域不限' },{ value: '花蓮市'},{ value: '鳳林鎮'},{ value: '玉里鎮'},{ value: '新城鄉'},{ value: '吉安鄉'},{ value: '壽豐鄉'},{ value: '光復鄉'},{ value: '豐濱鄉'},{ value: '瑞穗鄉'},{ value: '富里鄉'},{ value: '秀林鄉'},{ value: '萬榮鄉'},{ value: '卓溪鄉'}]
    const taitungAreaOptions = [{ value: '區域不限' },{ value: '臺東市'},{ value: '成功鎮'},{ value: '關山鎮'},{ value: '長濱鄉'},{ value: '池上鄉'},{ value: '東河鄉'},{ value: '鹿野鄉'},{ value: '卑南鄉'},{ value: '大武鄉'},{ value: '綠島鄉'},{ value: '太麻里鄉'},{ value: '海端鄉'},{ value: '延平鄉'},{ value: '金峰鄉'},{ value: '達仁鄉'},{ value: '蘭嶼鄉'}]
    const penghuAreaOptions = [{ value: '區域不限' },{ value: '馬公市'},{ value: '湖西鄉'},{ value: '白沙鄉'},{ value: '西嶼鄉'},{ value: '望安鄉'},{ value: '七美鄉'}]
    const kinmenAreaOptions = [{ value: '區域不限' },{ value: '金城鎮'},{ value: '金湖鎮'},{ value: '金沙鎮'},{ value: '金寧鄉'},{ value: '烈嶼鄉'},{ value: '烏坵鄉'}]
    const lianjiangAreaOptions = [{ value: '區域不限' },{ value: '南竿鄉'},{ value: '北竿鄉'},{ value: '莒光鄉'},{ value: '東引鄉'}]
    const typeOfRentalOptions = [{ value: '區域不限' },{ value: '類型不限' },{ value: '整層住家' }, { value: '獨立套房' }, { value: '分租套房' }, { value: '雅房' }];
    const priceOptions = [{ value: '區域不限' },{ value: '租金不限' },{ value: '0 - 5000 元' }, { value: '5000 - 10000 元' }, { value: '10000 - 20000 元' }, { value: '20000 - 30000 元' }, { value: '30000 - 40000 元' }, { value: '40000 以上元' }, { value: '自訂租金範圍' }];
    const roomOptions = [{ value: '區域不限' },{ value: '格局不限' },{ value: '1 房' }, { value: '2 房' }, { value: '3 房' }, { value: '4 房以上' }];
    const buildingTypeOptions = [{ value: '區域不限' },{ value: '型態不限' },{ value: '公寓' }, { value: '電梯大樓' }, { value: '透天' }];
    const pingOptions = [{ value: '區域不限' },{ value: '坪數不限' },{ value: '10 坪以下' }, { value: '10 - 20 坪' }, { value: '20 - 30 坪' }, { value: '30 - 40 坪' }, { value: '40 - 50 坪' }, { value: '自訂坪數範圍' }];
    const floorOptions = [{ value: '區域不限' },{ value: '樓層不限' },{ value: '1 層' }, { value: '2 - 6 層' }, { value: '6 - 12 層' }, { value: '12 層以上' }, { value: '自訂樓層範圍' }];
    const featureOptions = [{ value: '區域不限' },{ value: '可養寵物' }, { value: '可吸菸' }, { value: '可開伙' }, { value: '有管理員' }, { value: '有車位' }, { value: '倒垃圾服務' }];
    const sortOptions = [{ value: '區域不限' },{ value: '時間近到遠' },{ value: '時間遠到近' }, { value: '租金便宜到貴' }, { value: '租金貴到便宜' }, { value: '坪數小到大' }, { value: '坪數大到小' }];
    const [houses, setHouses] = useState([]);
    const [isCustomPrice, setIsCustomPrice] = useState(false);
    const [isCustomPing, setIsCustomPing] = useState(false);
    const [isCustomFloor, setIsCustomFloor] = useState(false);
    const [areaOptions, setAreaOptions] = useState([]);
    

    const getHousesArg ={
        start : '0',
        count : '9999999',
        timeSort : '-1',
        priceSort : '',
        pingSort : '',
        isDelete : 'false',
        minPrice : '0',
        maxPrice : '9999999',
        minPing : '0',
        maxPing : '999999',
        minRoom : '0',
        maxRoom : '999999',
        minFloor : '0',
        maxFloor : '999999',
        city : '',
        area : '',
        parking : '',
        pet : '',
        manager : '',
        garbage : '',
        smoke : '',
        cook : '',
        typeOfRental : '',
        buildingType : '',
    }

    const getHousesList = () => {
        if(isCustomPrice){
            const minCustomPrice = document.getElementById('minCustomPrice');
            const maxCustomPrice= document.getElementById('maxCustomPrice');
            getHousesArg.minPrice = minCustomPrice.value
            getHousesArg.maxPrice = maxCustomPrice.value
            if(isNaN(getHousesArg.minPrice) || isNaN(getHousesArg.maxPrice)){
                getHousesArg.minPrice = 0;
                getHousesArg.maxPrice = 0;
            }
        }

        if(isCustomPing){
            const minCustomPing = document.getElementById('minCustomPing');
            const maxCustomPing= document.getElementById('maxCustomPing');
            getHousesArg.minPing = minCustomPing.value
            getHousesArg.maxPing = maxCustomPing.value
            if(isNaN(getHousesArg.minPing) || isNaN(getHousesArg.maxPing)){
                getHousesArg.minPing = 0;
                getHousesArg.maxPing = 0;
            }
        }

        if(isCustomFloor){
            const minCustomFloor = document.getElementById('minCustomFloor');
            const maxCustomFloor= document.getElementById('maxCustomFloor');
            getHousesArg.minFloor = minCustomFloor.value
            getHousesArg.maxFloor = maxCustomFloor.value
            if(isNaN(getHousesArg.minFloor) || isNaN(getHousesArg.maxFloor)){
                getHousesArg.minFloor = 0;
                getHousesArg.maxFloor = 0;
            }
        }
        

        let reqUrl = `${housesListUrl}?start=${getHousesArg.start}&&count=${getHousesArg.count}&&isDelete=${getHousesArg.isDelete}&&minPrice=${getHousesArg.minPrice}&&maxPrice=${getHousesArg.maxPrice}&&minPing=${getHousesArg.minPing}&&maxPing=${getHousesArg.maxPing}&&minRoom=${getHousesArg.minRoom}&&maxRoom=${getHousesArg.maxRoom}&&minFloor=${getHousesArg.minFloor}&&maxFloor=${getHousesArg.maxFloor}`
        if(getHousesArg.city !==''){
            reqUrl = `${reqUrl}&&city=${getHousesArg.city}`
        }
        if(getHousesArg.area !==''){
            reqUrl = `${reqUrl}&&area=${getHousesArg.area}`
        }
        if(getHousesArg.parking !==''){
            reqUrl = `${reqUrl}&&parking=${getHousesArg.parking}`
        }
        if(getHousesArg.pet !==''){
            reqUrl = `${reqUrl}&&pet=${getHousesArg.pet}`
        }
        if(getHousesArg.manager !==''){
            reqUrl = `${reqUrl}&&manager=${getHousesArg.manager}`
        }
        if(getHousesArg.garbage !==''){
            reqUrl = `${reqUrl}&&garbage=${getHousesArg.garbage}`
        }
        if(getHousesArg.smoke !==''){
            reqUrl = `${reqUrl}&&smoke=${getHousesArg.smoke}`
        }
        if(getHousesArg.cook !==''){
            reqUrl = `${reqUrl}&&cook=${getHousesArg.cook}`
        }
        if(getHousesArg.typeOfRental !==''){
            reqUrl = `${reqUrl}&&typeOfRental=${getHousesArg.typeOfRental}`
        }
        if(getHousesArg.buildingType !==''){
            reqUrl = `${reqUrl}&&buildingType=${getHousesArg.buildingType}`
        }
        if(getHousesArg.timeSort !==''){
            reqUrl = `${reqUrl}&&timeSort=${getHousesArg.timeSort}`
        }
        if(getHousesArg.pingSort !==''){
            reqUrl = `${reqUrl}&&pingSort=${getHousesArg.pingSort}`
        }
        if(getHousesArg.priceSort !==''){
            reqUrl = `${reqUrl}&&priceSort=${getHousesArg.priceSort}`
        }
        console.log('====reqUrl===',reqUrl)
        HouseListAxios.get(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                }
            }
        )
        // .then( (response) => console.log(response))
        .then( (response) => {
            resolveHousesList(response)
            console.log(data)
        })
        .catch( (error) => alert(error))
    }
    
    function resolveHousesList(response){
        console.log('====response===',response)
        data = []
        if(response.data && response.data.data){
            const items = response.data.data
            for(let i = 0 ;i<items.length; i++){
                const item = {
                    key: i,
                    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25-%E5%8F%B0%E5%8C%97101-%E4%BD%B3%E4%BD%9C12-%E5%88%A9%E5%8B%9D%E7%AB%A0-%E5%94%AF%E6%88%91%E7%8D%A8%E5%B0%8A-101%E4%BF%A1%E7%BE%A9%E8%B7%AF-1590736305.jpg?crop=0.752xw:1.00xh;0.118xw,0&resize=640:*',
                    price: items[i].price,
                    address: `地址 : ${items[i].address}`,
                    content: [items[i].name, `地址 : ${items[i].address}`, `坪數 : ${items[i].ping}`, `樓層 : ${items[i].floor}`],
                    }
                if(items[i].saleInfo){
                    switch(items[i].saleInfo.typeOfRental){
                        case 1 :
                            item.content.push('類型 : 整層住家')
                            break;
                        case 2 :
                            item.content.push('類型 : 獨立套房')
                            break;
                        case 3 :
                            item.content.push('類型 : 分租套房')
                            break;
                        case 4 :
                            item.content.push('類型 : 雅房')
                            break;
                        default:

                    }
                }
                
                if(items[i].traffic.length >0){
                    item.content.push(`交通 : 距${items[i].traffic[0].name} ${items[i].traffic[0].distance} 公尺`)
                }
                if(items[i].life.length >0){
                    item.content.push(`生活 : 距${items[i].life[0].name} ${items[i].life[0].distance} 公尺`)
                }
                if(items[i].educate.length >0){
                    item.content.push(`教育 : 距${items[i].educate[0].name} ${items[i].educate[0].distance} 公尺`)
                }
                item.content.push(`更新時間 : ${items[i].updateTime}`)
                data.push(item)
            }
            setHouses(data)
        }
    }

    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    function changeSort(sort) {
        getHousesArg.timeSort = ''
        getHousesArg.pingSort = ''
        getHousesArg.priceSort = ''

        switch(sort){
            case sortOptions[0].value:
                getHousesArg.timeSort = '-1'
                break;
            case sortOptions[1].value:
                getHousesArg.timeSort = '1'
                break;
            case sortOptions[2].value:
                getHousesArg.priceSort = '1';
                break;
            case sortOptions[3].value:
                getHousesArg.priceSort = '-1';
                break;
            case sortOptions[4].value:
                getHousesArg.pingSort = '1';
                break;
            case sortOptions[5].value:
                getHousesArg.pingSort = '-1';
                break;
            default:
                getHousesArg.timeSort = '-1'
        }
    }

    function changeCity(city) {
        setAreaOptions([])
        if(cityOptions[0] !== city){
            getHousesArg.city = city
            getHousesArg.area = ''
            switch(city){
                case cityOptions[1].value:
                    setAreaOptions(taipeiAreaOptions)
                    break;
                case cityOptions[2].value:
                    setAreaOptions(newTaipeiAreaOptions)
                    break;
                case cityOptions[3].value:
                    setAreaOptions(taoyuanAreaOptions)
                    break;
                case cityOptions[4].value:
                    setAreaOptions(taichungAreaOptions)
                    break;
                case cityOptions[5].value:
                    setAreaOptions(tainanAreaOptions)
                    break;
                case cityOptions[6].value:
                    setAreaOptions(kaohsiungAreaOptions)
                    break;
                case cityOptions[7].value:
                    setAreaOptions(keelungAreaOptions)
                    break;
                case cityOptions[8].value:
                    setAreaOptions(hsinchuCityAreaOptions)
                    break;
                case cityOptions[9].value:
                    setAreaOptions(chiayiCityAreaOptions)
                    break;
                case cityOptions[10].value:
                    setAreaOptions(hsinchuAreaOptions)
                    break;
                case cityOptions[11].value:
                    setAreaOptions(miaoliAreaOptions)
                    break;
                case cityOptions[12].value:
                    setAreaOptions(changhuaAreaOptions)
                    break;
                case cityOptions[13].value:
                    setAreaOptions(nantouAreaOptions)
                    break;
                case cityOptions[14].value:
                    setAreaOptions(yunlinAreaOptions)
                    break;
                case cityOptions[15].value:
                    setAreaOptions(chiayiAreaOptions)
                    break;
                case cityOptions[16].value:
                    setAreaOptions(pingtungAreaOptions)
                    break;
                case cityOptions[17].value:
                    setAreaOptions(yilanAreaOptions)
                    break;
                case cityOptions[18].value:
                    setAreaOptions(hualienAreaOptions)
                    break;
                case cityOptions[19].value:
                    setAreaOptions(taitungAreaOptions)
                    break;
                case cityOptions[20].value:
                    setAreaOptions(penghuAreaOptions)
                    break;
                case cityOptions[21].value:
                    setAreaOptions(kinmenAreaOptions)
                    break;
                case cityOptions[22].value:
                    setAreaOptions(lianjiangAreaOptions)
                    break;
                default:
            }
        }
        console.log(getHousesArg)
    }

    function changeArea(area) {
        if(area === '區域不限'){
            getHousesArg.area = ''
        }else{
            getHousesArg.area = area
        }   
    }

    function changeTypeOfRental(typeOfRental) {
        switch(typeOfRental){
            case typeOfRentalOptions[1].value:
                getHousesArg.typeOfRental = 1;
                break;
            case typeOfRentalOptions[2].value:
                getHousesArg.typeOfRental = 2;
                break;
            case typeOfRentalOptions[3].value:
                getHousesArg.typeOfRental = 3;
                break;
            case typeOfRentalOptions[4].value:
                getHousesArg.typeOfRental = 4;
                break;
            default:
                getHousesArg.typeOfRental = ''
        }
    }

    function changePrice(price) {
        const customPrice = document.getElementById('customPrice');
        customPrice.style.display = 'none'
        setIsCustomPrice(false)
        switch(price){
            case priceOptions[1].value:
                getHousesArg.minPrice = 0;
                getHousesArg.maxPrice = 5000;
                break;
            case priceOptions[2].value:
                getHousesArg.minPrice = 5000;
                getHousesArg.maxPrice = 10000;
                break;
            case priceOptions[3].value:
                getHousesArg.minPrice = 10000;
                getHousesArg.maxPrice = 20000;
                break;
            case priceOptions[4].value:
                getHousesArg.minPrice = 20000;
                getHousesArg.maxPrice = 30000;
                break;
            case priceOptions[5].value:
                getHousesArg.minPrice = 30000;
                getHousesArg.maxPrice = 40000;
                break;
            case priceOptions[6].value:
                getHousesArg.minPrice = 40000;
                getHousesArg.maxPrice = 999999;
                break;
            case priceOptions[7].value:
                customPrice.style.display = 'flex'
                setIsCustomPrice(true)
                getHousesArg.minPrice = 0
                getHousesArg.maxPrice = 0
                break;
            default:
                getHousesArg.minPrice = 0
                getHousesArg.maxPrice = 999999
        }
        console.log(getHousesArg)
    }

    function changeRoom(room) {
        switch(room){
            case roomOptions[1].value:
                getHousesArg.minRoom = 1;
                getHousesArg.maxRoom = 1;
                break;
            case roomOptions[2].value:
                getHousesArg.minRoom = 2;
                getHousesArg.maxRoom = 2;
                break;
            case roomOptions[3].value:
                getHousesArg.minRoom = 3;
                getHousesArg.maxRoom = 3;
                break;
            case roomOptions[4].value:
                getHousesArg.minRoom = 4;
                getHousesArg.maxRoom = 999999;
                break;
            default:
                getHousesArg.minRoom = '0'
                getHousesArg.maxRoom = '999999'
        }
    }

    function changeBuildingType(buildingType) {
        switch(buildingType){
            case buildingTypeOptions[1].value:
                getHousesArg.buildingType = 1
                break;
            case buildingTypeOptions[2].value:
                getHousesArg.buildingType = 2;
                break;
            case buildingTypeOptions[3].value:
                getHousesArg.buildingType = 3;
                break;
            default:
                getHousesArg.buildingType = ''
        }
    }

    function changePing(ping) {
        const customPing = document.getElementById('customPing');
        customPing.style.display = 'none'
        setIsCustomPing(false)
        switch(ping){
            case pingOptions[1].value:
                getHousesArg.minPing = 0
                getHousesArg.maxPing = 10
                break;
            case pingOptions[2].value:
                getHousesArg.minPing = 10
                getHousesArg.maxPing = 20
                break;
            case pingOptions[3].value:
                getHousesArg.minPing = 20
                getHousesArg.maxPing = 30
                break;
            case pingOptions[4].value:
                getHousesArg.minPing = 30
                getHousesArg.maxPing = 40
                break;
            case pingOptions[5].value:
                getHousesArg.minPing = 40
                getHousesArg.maxPing = 50
                break;
            case pingOptions[6].value:
                // custom
                customPing.style.display = 'flex'
                setIsCustomPing(true)
                getHousesArg.minPing = 0
                getHousesArg.maxPing = 0
                break;
            default:
                getHousesArg.minPing = '0'
                getHousesArg.maxPing = '999999'
        }
    }
    
    function changeFloor(floor) {
        const customFloor = document.getElementById('customFloor');
        customFloor.style.display = 'none'
        setIsCustomFloor(false)
        switch(floor){
            case floorOptions[1].value:
                getHousesArg.minFloor = 0;
                getHousesArg.maxFloor = 1;
                break;
            case floorOptions[2].value:
                getHousesArg.minFloor = 2;
                getHousesArg.maxFloor = 6;
                break;
            case floorOptions[3].value:
                getHousesArg.minFloor = 6;
                getHousesArg.maxFloor = 12;
                break;
            case floorOptions[4].value:
                getHousesArg.minFloor = 12;
                getHousesArg.maxFloor = 9999999;
                break;
            case floorOptions[5].value:
                // custom
                customFloor.style.display = 'flex'
                setIsCustomFloor(true)
                getHousesArg.minFloor = 0;
                getHousesArg.maxFloor = 0;
                break;
            default:
                getHousesArg.minFloor = 0;
                getHousesArg.maxFloor = 999999;
        }
    }

    function changeFeature(feature) {
       if(feature.indexOf(featureOptions[0].value)>=0){
           getHousesArg.pet = 'true'
       }else{
            getHousesArg.pet = ''
       }

       if(feature.indexOf(featureOptions[1].value)>=0){
            getHousesArg.smoke = 'true'
        }else{
            getHousesArg.smoke = ''
        }

        if(feature.indexOf(featureOptions[2].value)>=0){
            getHousesArg.cook = 'true'
        }else{
            getHousesArg.cook = ''
        }

        if(feature.indexOf(featureOptions[3].value)>=0){
            getHousesArg.manager = 'true'
        }else{
            getHousesArg.manager = ''
        }

        if(feature.indexOf(featureOptions[4].value)>=0){
            getHousesArg.parking = 'true'
        }else{
            getHousesArg.parking = ''
        }

        if(feature.indexOf(featureOptions[5].value)>=0){
            getHousesArg.garbage = 'true'
        }else{
            getHousesArg.garbage = ''
        }
    }

    
      
      const columns = [
        {
          title: '影像',
          dataIndex: 'image',
          key: 'image',
          width:'150px',
          render: (image) => {
            return <Image
            src = {image}
            />
            },
        },
        // {
        //   title: '價格',
        //   dataIndex: 'price',
        //   key: 'price',
        //   width:'100px',
        //   render: (price) => {
        //     return <div >{price}</div>
        //     },
        // },
        {
          title: '內容',
          key: 'content',
          dataIndex: 'content',
        //   width:'100px',
          render: (content) => (
            <div style={{
                'text-align': 'center',
            }}>
               <div style={{
                'display': 'inline-block',
                'text-align': 'left',
                }}>
                  {content[0]}
                  <br/>
                  {content[1]}
                  <br/>
                  {content[2]}
                  <br/>
                  {content[3]}
                  <br/>
                  {content[4]}
                  <br/>
                  {content[5]}
                  <br/>
                  {content[6]}
                  <br/>
                  {content[7]}
                  <br/>
                  {content[8]}
                </div>
            </div>
          ),
        },
        {
          title: '價格',
          dataIndex: 'price',
          key: 'price',
        //   width:'100px',
          render: (price) => {
            return <div style={{
                'text-align': 'center',
            }}>{price}</div>
            },
        },
      ];
      
      let data = [
        {
          key: '1',
          image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25-%E5%8F%B0%E5%8C%97101-%E4%BD%B3%E4%BD%9C12-%E5%88%A9%E5%8B%9D%E7%AB%A0-%E5%94%AF%E6%88%91%E7%8D%A8%E5%B0%8A-101%E4%BF%A1%E7%BE%A9%E8%B7%AF-1590736305.jpg?crop=0.752xw:1.00xh;0.118xw,0&resize=640:*',
          price: 10000,
          address: 'New York No. 1 Lake Park',
          content: ['文山區好房子', '台北市文山區興隆路二段', '獨立套房','萬芳醫院站200公尺'],
        }
      ];

      

    return (

        <div>
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Button type="primary" onClick={getHousesList} style={{
                            width: '100%',
                        }}>
                        搜尋
                    </Button>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select allowClear placeholder="排序:默認時間近到遠" options={sortOptions} onChange={changeSort} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Input placeholder="文字搜尋 : 請輸入捷運站名,公車站名"  style={{
                            width: '100%',
                        }}>
                    </Input>
                </Col>
            </Row>

            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select id="citySelect" placeholder="縣市" options={cityOptions} onChange={changeCity} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select allowClear placeholder="區域" options={areaOptions} onChange={changeArea} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select placeholder="類型"  options={typeOfRentalOptions} onChange={changeTypeOfRental} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
            </Row>

            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select mode="multiple" allowClear placeholder="特色"  options={featureOptions} onChange={changeFeature} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select allowClear placeholder="格局" options={roomOptions} onChange={changeRoom} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select placeholder="型態"  options={buildingTypeOptions} onChange={changeBuildingType} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
            </Row>
            
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select placeholder="租金" options={priceOptions} onChange={changePrice} style={{
                            width: '100%',
                        }}>
                    </Select>
                    
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select placeholder="坪數" options={pingOptions} onChange={changePing} style={{
                            width: '100%',
                        }}>
                    </Select>
                    
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select allowClear placeholder="樓層" options={floorOptions} onChange={changeFloor} style={{
                            width: '100%',
                        }}>
                    </Select>
                    
                </Col>
            </Row>
            
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <span id="customPrice" style={{
                            width: '100%',
                            display: 'none'
                            }}>
                        自訂租金：
                        <Input id="minCustomPrice" placeholder="最低租金(請輸入數字)"  style={{
                                width: '37%',
                            }}>
                        </Input>
                        &nbsp;&nbsp;-&nbsp;&nbsp;
                        <Input id="maxCustomPrice" placeholder="最高租金(請輸入數字)"  style={{
                                width: '37%',
                            }}>
                        </Input>
                    </span>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <span id="customPing" style={{
                            width: '100%',
                            display: 'none'
                            }}>
                        自訂坪數：
                        <Input id="minCustomPing" placeholder="最低坪數(請輸入數字)"  style={{
                                width: '37%',
                            }}>
                        </Input>
                        &nbsp;&nbsp;-&nbsp;&nbsp;
                        <Input id="maxCustomPing" placeholder="最高坪數(請輸入數字)"  style={{
                                width: '37%',
                            }}>
                        </Input>
                    </span>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <span id="customFloor" style={{
                            width: '100%',
                            display: 'none'
                            }}>
                        自訂樓層：
                        <Input id="minCustomFloor" placeholder="最低樓層(請輸入數字)"  style={{
                                width: '37%',
                            }}>
                        </Input>
                        &nbsp;&nbsp;-&nbsp;&nbsp;
                        <Input id="maxCustomFloor" placeholder="最高樓層(請輸入數字)"  style={{
                                width: '37%',
                            }}>
                        </Input>
                    </span>
                </Col>
            </Row>
        <Row>
            <Col  xs={24} sm={4} md={4} lg={4} xl={4}></Col>
            <Col  xs={24} sm={16} md={16} lg={16} xl={16}>
            <Table
                columns={columns}
                pagination={{ position: ['topLeft', 'bottomRight'] }}
                dataSource={houses}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                        console.log('event',event)
                        console.log('record',record)
                        console.log('rowIndex',rowIndex)
                        alert("進入詳細資料")
                    }, // click row
                };}}
            />
            </Col>
            <Col  xs={24} sm={4} md={4} lg={4} xl={4}></Col>
        </Row>
        </div>
    );
};

export default HousesList;