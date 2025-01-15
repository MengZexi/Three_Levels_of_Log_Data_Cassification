// ==UserScript==
// @name         Three_Levels_of_Log_Data_Cassification
// @namespace    http://tampermonkey.net/
// @version      v0.30
// @description  Typesetting the contents
// @author       Mozikiy
// @match        http://annot.xhanz.cn/project/*/*
// @match        https://annot.aminer.cn/project/*/*
// @icon         https://www.latex-project.org/favicon.ico
// @license      GNU GPLv3
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Function to create a modal popup
    function createModal() {
        // Create modal container
        const modal = document.createElement('div');
        modal.id = 'customModal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'white';
        modal.style.zIndex = '9998';
        modal.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
        modal.style.overflowY = 'scroll';
        modal.style.padding = '20px';
        modal.style.borderRadius = '8px';
        modal.style.display = 'none';

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.padding = '5px 10px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = () => {
            modal.style.display = 'none';
        };
        modal.appendChild(closeButton);

        // Create content container for images
        const content = document.createElement('div');
        content.id = 'modalContent';
        modal.appendChild(content);

        document.body.appendChild(modal);
        return modal;
    }

    function clickCheckboxByValue(value) {
        const checkbox = document.querySelector(`input.ant-checkbox-input[type="checkbox"][value="${value}"]`);
        if (checkbox) {
            checkbox.click();
            console.log(`复选框（value=${value}）已被点击`);
        } else {
            console.log(`未找到 value=${value} 的复选框`);
        }
    }


    function clickCheckboxByInfo(Info) {
        // 定义识别列表
        const recognitionList = [
            "物体识别",
            "物体属性识别",
            "文本属性识别",
            "人物识别",
            "人物属性识别",
            "动物识别",
            "动物属性识别",
            "场景识别",
            "场景属性识别",
            "动作识别/预测",
            "空间信息",
            "文本识别",
            "文本情感识别",
            "动物情感识别",
            "场景情感识别",
            "计数类",
            "多物体对比",
            "多物体关系",
            "社会关系",
            "多人交互活动",
            "对话内容预测",
            "多主体情感识别",
            "多图比较",
            "多子图比较",
            "视频理解",
            "物理视角",
            "主观视角",
            "评价看法",
            "常识推理",
            "事件分析",
            "图片标题",
            "图片内容描述",
            "图表信息提取",
            "图表推理",
            "数学",
            "艺术与设计",
            "经济金融",
            "生物医学",
            "文学与语言学",
            "物理",
            "化学",
            "天文地理",
            "历史",
            "哲学",
            "教育学",
            "管理类",
            "政治军事",
            "法学",
            "计算机",
            "逻辑推理",
            "代码推理",
            "代码报错解析",
            "代码编写",
            "翻译",
            "公式转换",
            "写作",
            "文字总结",
            "文字修改",
            "工具使用",
            "超自然科学",
            "成分分析",
            "影视时尚",
            "书籍刊物",
            "动漫游戏",
            "穿搭建议",
            "食谱问答",
            "食物分析",
            "安全",
            "能力限制"
        ];
        // 将输入信息转为对应序号的函数
        function Info2Value(info) {
            const index = recognitionList.indexOf(info);
            let value = -1;
            if (index < 12) {
                value = index + 1;
            }
            else{
                value = index + 2;
            }
            if (index === -1) {
            return "输入无效";
            }
            return value.toString(); // 序号从2开始
        }
        let value = Info2Value(Info);
        const checkbox = document.querySelector(`input.ant-checkbox-input[type="checkbox"][value="${value}"]`);
        if (checkbox) {
            checkbox.click();
            console.log(`复选框（value=${value}）已被点击`);
        } else {
            console.log(`未找到 value=${value} 的复选框`);
        }
    }

    // Function to populate images in the modal
    function populateImages(modal) {
        const root = document.querySelector('#root');
        const images = root ? root.querySelectorAll('.ant-image-img.css-3v32pk') : [];  // ant-image-img css-3v32pk
        const content = modal.querySelector('#modalContent');
        content.innerHTML = ''; // Clear previous content

        let contents_indicate = ''; 
        let contents_refer = '';
        const preElements = document.querySelectorAll('div.sc-ibiNDR');
        if (preElements.length > 5) {
            contents_indicate = preElements[4].textContent.trim();
            contents_refer = preElements[5].textContent.trim();
            console.log('第 4 个内容:', contents_indicate);
            console.log('第 5 个内容:', contents_refer);
        } else {
            console.error('未找到足够的匹配元素');
        }

        clickCheckboxByInfo(contents_refer.trim());

        // 创建一个容器来存放图像和文本内容
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.alignItems = 'center'; // 垂直居中对齐
        rowDiv.style.justifyContent = 'space-between'; // 横向分布
        rowDiv.style.marginBottom = '20px';

        const imgContainer = document.createElement('div');
        imgContainer.style.flex = '3'; // 占用一列
        imgContainer.style.display = 'flex';
        imgContainer.style.justifyContent = 'center';
        imgContainer.style.alignItems = 'center';
        const uniqueImages = [];
        images.forEach((img, index) => {
            if (!uniqueImages.includes(img)) {
                uniqueImages.push(img);
            }
        });
        let img;
        img = uniqueImages[0].cloneNode(true);
        img.style.width = 'calc(25% - 10px)'; // 25% - 10px margin
        img.style.height = 'auto';
        img.style.margin = '5px';
        img.onclick = () => {
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '9999';
            modal.style.flexDirection = 'column';
            modal.style.overflow = 'hidden';
            const closeButton = document.createElement('div');
            closeButton.textContent = 'X';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '20px';
            closeButton.style.right = '20px';
            closeButton.style.fontSize = '24px';
            closeButton.style.color = 'white';
            closeButton.style.cursor = 'pointer';
            closeButton.style.fontWeight = 'bold';
            closeButton.onclick = () => {
                modal.remove();
            };
            const fullSizeImg = document.createElement('img');
            fullSizeImg.src = img.src;
            fullSizeImg.style.maxWidth = '90%';
            fullSizeImg.style.maxHeight = '90%';
            fullSizeImg.style.border = '2px solid white';
            fullSizeImg.style.objectFit = 'contain';
            modal.onclick = (event) => {
                if (event.target === modal) {
                    modal.remove();
                }
            };
            modal.appendChild(closeButton);
            modal.appendChild(fullSizeImg);
            document.body.appendChild(modal);
        };
        imgContainer.appendChild(img);
       
        // 第一段文本列
        const textContainer1 = document.createElement('div');
        textContainer1.style.flex = '1'; // 占用一列
        textContainer1.style.textAlign = 'center';
        textContainer1.style.padding = '0 10px';
        const textElement1 = document.createElement('p');
        textElement1.textContent = contents_indicate;
        textElement1.style.whiteSpace = 'pre-wrap';
        textElement1.style.margin = '0';
        textContainer1.appendChild(textElement1);
        // 第二段文本列
        const textContainer2 = document.createElement('div');
        textContainer2.style.flex = '1'; // 占用一列
        textContainer2.style.textAlign = 'center';
        textContainer2.style.padding = '0 10px';
        const textElement2 = document.createElement('p');
        textElement2.textContent = contents_refer;
        textElement2.style.whiteSpace = 'pre-wrap';
        textElement2.style.margin = '0';
        textContainer2.appendChild(textElement2);

        rowDiv.appendChild(imgContainer);
        rowDiv.appendChild(textContainer1);
        rowDiv.appendChild(textContainer2);
        content.appendChild(rowDiv);
    
        // Add a button group for the row
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexWrap = 'wrap';
        container.style.justifyContent = 'space-around';
    
        // Create a mapping for status
        const categories = [
            {
                "title": "图片内容识别",
                "buttons": [
                    {
                        "label": "物体识别",
                        "description": "要求识别物体、植物、地标的名称",
                        "example": "",
                        "value": "1"
                    },
                    {
                        "label": "物体属性识别",
                        "description": "要求识别物体、植物的属性，如颜色、大小",
                        "example": "1. 请描述图片中键盘上某些字母按键的光照顾色变化\n2. 请详细分析图片中商店的特征，包含它的名称、位置及其间围环境，3. 请根据图像中的时钟信息写xxx",
                        "value": "2"
                    },
                    {
                        "label": "文本属性识别",
                        "description": "要求识别文本的属性，如颜色",
                        "example": "图片中标志上的字母是什么颜色的？",
                        "value": "3"
                    },
                    {
                        "label": "人物识别",
                        "description": "识别人物（包括现实名人及虚拟人物）的名称",
                        "example": "请表明左边的人物是谁",
                        "value": "4"
                    },
                    {
                        "label": "人物属性识别",
                        "description": "识别人物的基本属性，如着装、年龄",
                        "example": "1. 请根据图片中的人物的衣着特征分析xxx\n2. 描述图片中角色的主要外观特征和穿着",
                        "value": "5"
                    },
                    {
                        "label": "动物识别",
                        "description": "识别动物的种类",
                        "example": "说明图片中的猫咪是什么品种",
                        "value": "6"
                    },
                    {
                        "label": "动物属性识别",
                        "description": "识别动物的基本属性，如颜色、大小",
                        "example": "请描述这张图片中猫咪的颜色",
                        "value": "7"
                    },
                    {
                        "label": "场景识别",
                        "description": "识别场景的类别，如机场、卧室、操场、办公室、公园等。",
                        "example": "这张图片是在什么场景下拍摄的？",
                        "value": "8"
                    },
                    {
                        "label": "场景属性识别",
                        "description": "识别场景的属性，如时间、季节、温度、布局",
                        "example": "1. 分析图片中验室与走之间的布局关系，描述走廊两端的房间布局。2. 通过图片中的树叶颜色和人物穿着判断这是哪个季节。3. 分析图片中阴影的位置和长度，推测拍摄时间是上午还是下午",
                        "value": "9"
                    },
                    {
                        "label": "动作识别/预测",
                        "description": "识别当前进行的活动/运动/行为",
                        "example": "1. 这个人参加的是哪种类型的活动？",
                        "value": "10"
                    },
                    {
                        "label": "空间信息",
                        "description": "即定位，识别当前物体/人物/动物在画面中的位置",
                        "example": "描述橙子在画面中的位置",
                        "value": "11"
                    }
                ]
            },
            {
                "title": "图片信息提取",
                "buttons": [
                    {
                        "label": "文本识别",
                        "description": "要求识别英文，中文或数字",
                        "example": "阅读图片中的所有文字信息",
                        "value": "12"
                    }]
            },
            {
                "title": "图片内容理解",
                "buttons": [
                    {
                        "label": "文本情感识别",
                        "description": "要求识别图片中文本传达的情感",
                        "example": "分析图片中文字的情感倾向",
                        "value": "14"
                    },
                    {
                        "label": "动物情感识别",
                        "description": "识别人物的动物的情感、氛围",
                        "example": "1. 描述一个人物收拾案是过程中的心情变化\n2. 观察图片中的女孩，请描述她的情感状态，并详细说明情感的视觉线索，3. 推测一下拍摄者可能的情感。",
                        "value": "15"
                    },
                    {
                        "label": "场景情感识别",
                        "description": "识别后片整体的情感。荒田",
                        "example": "1. 通过这段话题法出图片中的情感和氛围\n2. 用词语来形容孩子所在环境的情感氛围。",
                        "value": "16"
                    },
                    {
                        "label": "计数类",
                        "description": "问题中要求对物体的数量进行计算",
                        "example": "数一数这幅图片中有多少只鸟",
                        "value": "17"
                    },
                    {
                        "label": "多物体对比",
                        "description": "要求在多个物体实业进行比较，找不同或者共同",
                        "example": "比较两种植物的叶子形和颜色。\n1. 通过图片中没旁边植物的花盆颜色\n2. 请通过图片中的信息描述这几个交通工具之间的相对位置关系",
                        "value": "18"
                    },
                    {
                        "label": "多物体关系",
                        "description": "要求用断两个及以上初体的空间关系，或其他的抽象关系（例如从属关系）",
                        "example": "",
                        "value": "19"
                    },
                    {
                        "label": "社会关系",
                        "description": "推测关人之间的社会关系，如父子等",
                        "example": "根据图像中个体之间的互动。请分析图片中再位运动的互动关系，并描述他们所处的环境及正在进行的活动。",
                        "value": "20"
                    },
                    {
                        "label": "多人交互活动",
                        "description": "涉及多人之间的互动行为",
                        "example": "",
                        "value": "21"
                    },
                    {
                        "label": "对话内容预测",
                        "description": "预测人物问可能会进行的对话内容",
                        "example": "1. 假设这些物体之间有一段对话，大致会是怎样的？\n2. 你认为他们的对话可能涉及到哪些话题？",
                        "value": "22"
                    },
                    {
                        "label": "多主体情感识别",
                        "description": "识别多个主体体验到的情感状态，或者多人对话中各自传达的情感多因比较",
                        "example": "1. 请基于图片中的文字内容和人物对话、推断出这些人物进行对话所表达的信息或情感\n2. 请观察图片中的两个小朋友、推测他们的情感状态",
                        "value": "23"
                    },
                    {
                        "label": "多图比较",
                        "description": "多张图片比较",
                        "example": "通过对比再表面，找出它们的共同点和不同点。",
                        "value": "24"
                    },
                    {
                        "label": "多子图比较",
                        "description": "一张图片被明确划分为多个子区域，涉及多个区域之间的对比",
                        "example": "通过对比子图，找出它们的共同点和不同点。",
                        "value": "25"
                    },
                    {
                        "label": "视频理解",
                        "description": "一段视频的多帧连贯截图",
                        "example": "",
                        "value": "26"
                    },
                    {
                        "label": "物理视角",
                        "description": "从某个特定的角度观察，例如上下左右",
                        "example": "如果从上向下看能看到什么物体",
                        "value": "27"
                    },
                    {
                        "label": "主观视角",
                        "description": "以画面中某个主体的视角观察、叙述",
                        "example": "1. 图片中狗的视角中能看到什么东西\n2. 以驾驶员视角描述看到的画面",
                        "value": "28"
                    },
                    {
                        "label": "评价看法",
                        "description": "基于图片理解对内容作出评价",
                        "example": "1.评价一下照片中的人的长相",
                        "value": "29"
                    },
                    {
                        "label": "常识推理",
                        "description": "在图片理解基础上依据常识进行推理",
                        "example": "",
                        "value": "30"
                    },
                    {
                        "label": "事件分析",
                        "description": "基于图片理解，对图片中发生的事件给出建议/解决方案",
                        "example": "1.面对图片中的状况，应该如何处理",
                        "value": "31"
                    }
                    
                ]
            },
            {
                "title": "图片信息描述",
                "buttons": [
                    {
                        "label": "图片标题",
                        "description": "这张图片的主题是什么",
                        "example": "",
                        "value": "32"
                    },
                    {
                        "label": "图片内容描述",
                        "description": "描述图片绘制的内容",
                        "example": "1. 描述下这张图片",
                        "value": "33"
                    }
                ]
            },
            {
                "title": "图表类",
                "buttons": [
                    {
                        "label": "图表信息提取",
                        "description": "图像内容为图表、问题和回答是针对此图表的分析类提问",
                        "example": "1. 请解析图表中五个国家的销售量，收入和利润",
                        "value": "34"
                    },
                    {
                        "label": "图表推理",
                        "description": "在图表理解基础上对进行分析和预测",
                        "example": "",
                        "value": "35"
                    }
                ]
            },
            {
                "title": "学科题目解答",
                "buttons": [
                    {
                        "label": "数学",
                        "description": "例如解数学题",
                        "example": "",
                        "value": "36"
                    },
                    {
                        "label": "艺术与设计",
                        "description": "",
                        "example": "",
                        "value": "37"
                    },
                    {
                        "label": "经济金融",
                        "description": "",
                        "example": "",
                        "value": "38"
                    },
                    {
                        "label": "生物医学",
                        "description": "",
                        "example": "",
                        "value": "39"
                    },
                    {
                        "label": "文学与语言学",
                        "description": "",
                        "example": "",
                        "value": "40"
                    },
                    {
                        "label": "物理",
                        "description": "",
                        "example": "",
                        "value": "41"
                    },
                    {
                        "label": "化学",
                        "description": "",
                        "example": "",
                        "value": "42"
                    },
                    {
                        "label": "天文地理",
                        "description": "",
                        "example": "",
                        "value": "43"
                    },
                    {
                        "label": "历史",
                        "description": "",
                        "example": "",
                        "value": "44"
                    },
                    {
                        "label": "哲学",
                        "description": "",
                        "example": "",
                        "value": "45"
                    },
                    {
                        "label": "教育学",
                        "description": "",
                        "example": "",
                        "value": "46"
                    },
                    {
                        "label": "管理类",
                        "description": "",
                        "example": "",
                        "value": "47"
                    },
                    {
                        "label": "政治军事",
                        "description": "",
                        "example": "",
                        "value": "48"
                    },
                    {
                        "label": "法学",
                        "description": "",
                        "example": "",
                        "value": "49"
                    },
                    {
                        "label": "计算机",
                        "description": "",
                        "example": "",
                        "value": "50"
                    },
                    {
                        "label": "逻辑推理",
                        "description": "行测类题目，例如找规律等",
                        "example": "",
                        "value": "51"
                    }
                ]
            },
            {
                "title": "代码类",
                "buttons": [
                    {
                        "label": "代码推理",
                        "description": "根据图片上的代码预测结果",
                        "example": "",
                        "value": "52"
                    },
                    {
                        "label": "代码报错解析",
                        "description": "根据短信信息推测可能存在的问题",
                        "example": "",
                        "value": "53"
                    },
                    {
                        "label": "代码编写",
                        "description": "根据需要实现的功能编写代码",
                        "example": "",
                        "value": "54"
                    }
                ]
            },
            {
                "title": "文字处理/写作类",
                "buttons": [
                    {
                        "label": "翻译",
                        "description": "将图片文字翻译成另一种语言",
                        "example": "",
                        "value": "55"
                    },
                    {
                        "label": "公式转换",
                        "description": "对图片中的公式转变求进行转换",
                        "example": "",
                        "value": "56"
                    },
                    {
                        "label": "写作",
                        "description": "根据图片编写宣传语，根据图中文字撰写作文",
                        "example": "",
                        "value": "57"
                    },
                    {
                        "label": "文字总结",
                        "description": "对图片中文字内容作总结",
                        "example": "1. 请总结一下",
                        "value": "58"
                    },
                    {
                        "label": "文字修改",
                        "description": "修改图中文字时的问题，语法/拼写等",
                        "example": "",
                        "value": "59"
                    }
                ]
            },
            {
                "title": "世界知识",
                "buttons": [
                    {
                        "label": "工具使用",
                        "description": "方达成果一目标、在该工具上应该进行什么操作",
                        "example": "1. 怎么加粗字体",
                        "value": "60"
                    },
                    {
                        "label": "超自然科学",
                        "description": "通过自然的方式上解释现象",
                        "example": "1. 冬日运动如何2. 怎么解读这个生辰八字",
                        "value": "61"
                    },
                    {
                        "label": "成分分析",
                        "description": "识别图片中的药物或者表，回答相关问题",
                        "example": "这个药有什么作用",
                        "value": "62"
                    },
                    {
                        "label": "影视时尚",
                        "description": "识别图片的电影/品等等，回答问题",
                        "example": "这部电影讲了什么",
                        "value": "63"
                    },
                    {
                        "label": "书籍刊物",
                        "description": "识别图片中的非糖/杂志等，回答问题",
                        "example": "这是哪本小说",
                        "value": "64"
                    },
                    {
                        "label": "动漫游戏",
                        "description": "识别图片属于某款游戏或出自某部动漫，回答问题",
                        "example": "介绍一下这款游戏的玩法",
                        "value": "65"
                    },
                    {
                        "label": "穿搭建议",
                        "description": "回答表原格配类的问题",
                        "example": "这件上衣或压缩搭配什么颜色的裤子",
                        "value": "66"
                    },
                    {
                        "label": "食谱问答",
                        "description": "识别图片中的食材，回答支任相关的问题",
                        "example": "这几个食材，可以做什么菜",
                        "value": "67"
                    },
                    {
                        "label": "食物分析",
                        "description": "识别图片的食物，回答食物这分相关的问题",
                        "example": "对海鲜过敏的人可以吃这个吗",
                        "value": "68"
                    }
                ]
            },
            {
                "title": "其他",
                "buttons": [
                    {
                        "label": "安全",
                        "description": "不安全的图片，应拒绝回答（包含黄暴，政治敏感等问题）",
                        "example": "",
                        "value": "69"
                    },
                    {
                        "label": "能力限制",
                        "description": "横型能力外的要求，例如修改图片",
                        "example": "",
                        "value": "70"
                    }
                ]
            }    
        ];

        categories.forEach(column => {
            // Create column container
            const columnDiv = document.createElement('div');
            columnDiv.style.width = '7%';
            columnDiv.style.margin = '10px';
            
            // Create title
            const title = document.createElement('h3');
            title.innerText = column.title;
            title.style.textAlign = 'center';
            columnDiv.appendChild(title);
            
            // Create buttons
            column.buttons.forEach(button => {
                const btn = document.createElement('button');
                btn.innerText = button.label;
                btn.style.width = '100%';
                btn.style.marginBottom = '5px';
                btn.title = `描述: ${button.description}\n示例: ${button.example}`;
                btn.onmouseenter = () => {
                const tooltip = document.createElement('div');
                tooltip.innerText = `描述: ${button.description}\n示例: ${button.example}`;
                tooltip.style.position = 'absolute';
                tooltip.style.background = '#f9f9f9';
                tooltip.style.border = '1px solid #ccc';
                tooltip.style.padding = '10px';
                tooltip.style.borderRadius = '5px';
                tooltip.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.3)';
                tooltip.id = 'tooltip';
                document.body.appendChild(tooltip);
            
                btn.onmousemove = (e) => {
                    tooltip.style.top = `${e.clientY + 10}px`;
                    tooltip.style.left = `${e.clientX + 10}px`;
                };
                };
            
                btn.onmouseleave = () => {
                const tooltip = document.getElementById('tooltip');
                if (tooltip) document.body.removeChild(tooltip);
                };
            
                // Leave the click callback empty
                btn.onclick = () => {
                    clickCheckboxByValue(button.value);
                };
                columnDiv.appendChild(btn);
        });
        
        container.appendChild(columnDiv);
        }); 
        content.appendChild(container);
    }

    // // 定位到按钮元素
    // let buttons = document.querySelectorAll('.ant-btn.css-3v32pk.ant-btn-primary'); // 选择所有匹配的按钮
    // let targetButton = null;
    // buttons.forEach((button) => {
    //     if (button.textContent.trim() === '提 交') { 
    //         targetButton = button;
    //     }
    // });

    // if (targetButton) {
    //     let event = new MouseEvent('click', {
    //         bubbles: true,  
    //         cancelable: true,  
    //         view: window
    //     });
    //     targetButton.dispatchEvent(event); 
    //     console.log('按钮已点击');
    // } else {
    //     console.error('未找到名字为"提交"的按钮');
    // }

    // Initialize modal
    const modal = createModal();
    // Add event listener for CTRL+H
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'm') {
            event.preventDefault();
            populateImages(modal);
            modal.style.display = 'block';
        }
    });
    // Add event listener for CTRL+B
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'b') {
            event.preventDefault();
            // populateImages(modal);
            modal.style.display = 'none';
            // 定位到按钮元素
            let buttons = document.querySelectorAll('.ant-btn.css-3v32pk.ant-btn-primary'); // 选择所有匹配的按钮
            let targetButton = null;
            buttons.forEach((button) => {
                if (button.textContent.trim() === '提 交') { 
                    targetButton = button;
                }
            });

            if (targetButton) {
                let event = new MouseEvent('click', {
                    bubbles: true,  
                    cancelable: true,  
                    view: window
                });
                targetButton.dispatchEvent(event); 
                console.log('按钮已点击');
            } else {
                console.error('未找到名字为"提交"的按钮');
            }
        }
    });
    // Log script initialization
    console.log('Three_Levels_of_Log_Data_Cassification : v0.30 Script Updated!');
})();
