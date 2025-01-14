// ==UserScript==
// @name         Three_Levels_of_Log_Data_Cassification
// @namespace    http://tampermonkey.net/
// @version      v0.01
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

    // Function to populate images in the modal
    function populateImages(modal) {
        const root = document.querySelector('#root');
        const images = root ? root.querySelectorAll('.ant-image-img.css-3v32pk') : [];  // ant-image-img css-3v32pk
        const content = modal.querySelector('#modalContent');

        content.innerHTML = ''; // Clear previous content

        // Extract content from pre element with class "sc-bBeLha ibkpEM"
        let preElements_indicate = document.querySelectorAll('.sc-goMbjt.bspyeI');  // sc-goMbjt bspyeI   // sc-fWfJve eMhCce

        if (preElements_indicate.length === 0) {
            preElements_indicate = document.querySelectorAll('.sc-kkjQnW.hLgmKW'); 
        }
        if (preElements_indicate.length === 0) {
            preElements_indicate = document.querySelectorAll('.sc-igSCHh.jAIZfb');  // sc-igSCHh jAIZfb
        }

        let contents_indicate = Array.from(preElements_indicate)[1].textContent.trim()
        // let preElements_refer = document.querySelectorAll('.sc-fWfJve.eMhCce');  // sc-goMbjt bspyeI   // sc-fWfJve eMhCce


        if (preElements_indicate.length > 0) {
            console.log('Find:', preElements_indicate);
        } else {
            console.log('No <pre> element with class "sc-bBeLha ibkpEM" found on the page.');
        }

        // Create a new list to store unique elements
        const uniqueImages = [];
        images.forEach((img, index) => {
            if (!uniqueImages.includes(img)) {
                uniqueImages.push(img);
            }
        });
        let images_count = uniqueImages.length;
       
        const textContainer = document.createElement('div');
        textContainer.style.display = 'flex';
        textContainer.style.justifyContent = 'center';
        textContainer.style.marginBottom = '10px';

        const textElement = document.createElement('p');
        textElement.textContent = contents_indicate;
        textElement.style.whiteSpace = 'pre-wrap';
        textElement.style.margin = '0 20px';
        textElement.style.textAlign = 'center';
        textContainer.appendChild(textElement);

        content.appendChild(textContainer);

        
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.justifyContent = 'space-between'; // 均匀分布
        rowDiv.style.flexWrap = 'wrap'; // 允许换行
        rowDiv.style.marginBottom = '10px';
    
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
        

        rowDiv.appendChild(img);
        
        content.appendChild(rowDiv);
    
        // Add a button group for the row
        const buttonGroupDiv = document.createElement('div');
        buttonGroupDiv.style.display = 'flex';
        buttonGroupDiv.style.justifyContent = 'center';
        buttonGroupDiv.style.marginTop = '5px';
    
        // Create and append 5 buttons

        const statusMapping = {
            1: "未加载",
            2: "未加载元素",
            3: "已加载元素",
            4: "其他",
            5: "完成",
            6: "跳过"
        };

        for (let i = 1; i <= 6; i++) {
            const button = document.createElement('button');
            button.textContent = statusMapping[i];
            button.style.margin = '0 5px';
            button.style.padding = '5px 10px';
            button.style.cursor = 'pointer';
            button.onclick = () => {
                // // 定位到下拉框的根容器
                // // let dropdown = document.querySelector('.ant-select.ant-select-in-form-item');
                

                // // 模拟点击下拉框以展开选项列表
                // dropdown.click();

                // // 等待下拉框展开后定位到目标选项
                // setTimeout(() => {
                //     // 根据选项内容定位到对应的元素
                //     let option = Array.from(document.querySelectorAll('.ant-select-item-option'))
                //         .find(el => el.textContent.trim() === '人物属性识别');

                //     // 模拟点击目标选项
                //     if (option) {
                //         option.click();
                //         console.log('选中“人物属性识别”成功');
                //     } else {
                //         console.error('未找到目标选项');
                //     }
                // }, 500); // 延时确保下拉框选项已加载

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
            };
            buttonGroupDiv.appendChild(button);
        }
    
        // Append the button group after the rowDiv
        content.appendChild(buttonGroupDiv);
        

        if (content.childElementCount === 0) {
            content.textContent = 'No images to display!';
        }
    }

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
        }
    });

    // Log script initialization
    console.log('Three_Levels_of_Log_Data_Cassification : v0.01 Script Updated!');
})();
