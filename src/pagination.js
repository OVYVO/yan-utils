/*
 * @Author: your name
 * @Date: 2020-10-18 10:51:39
 * @LastEditTime: 2020-10-18 11:13:01
 * @LastEditors: Please set LastEditors
 * @Description: 分页函数
 * @FilePath: \yan-utils\src\pagenation.js
 */


class Pagination {
    static CLASS_NAME = {
        ITEM: 'pagination-item',
        LINK: 'pagination-link',
    };
    static PAGE_INFOS = [{
            id: 'first',
            content: '首页',
        },
        {
            id: 'prev',
            content: '前一页',
        },
        {
            id: 'next',
            content: '后一页',
        },
        {
            id: 'last',
            content: '尾页',
        },
        {
            id: '',
            content: '...',
        },
    ];
    constructor(selector, options = {}) {
        // 默认配置
        this.options = {
            curr: 1,
            pageShow: 2,
            ellipsis: true,
            hash: false,
        };
        Object.assign(this.options, options);
        this.init(selector);
    }

    addEvent(element, type, handler) {
        // 添加绑定
        if (element.addEventListener) {
            // 使用DOM2级方法添加事件
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            // 使用IE方法添加事件
            element.attachEvent('on' + type, handler);
        } else {
            // 使用DOM0级方法添加事件
            element['on' + type] = handler;
        }
    }

    // 模仿jQuery $()
    $(selector, context) {
        context = arguments.length > 1 ? context : document;
        return context ? context.querySelectorAll(selector) : null;
    }

    getPageInfos(className, content) {
        return {
            id: 'page',
            className: className,
            content: content,
        };
    }

    changePage() {
        let pageElement = this.pageElement;
        this.addEvent(pageElement, 'click', ev => {
            let e = ev || window.event;
            let target = e.target || e.srcElement;
            if (target.nodeName.toLocaleLowerCase() == 'a') {
                if (target.id === 'prev') {
                    this.prevPage();
                } else if (target.id === 'next') {
                    this.nextPage();
                } else if (target.id === 'first') {
                    this.firstPage();
                } else if (target.id === 'last') {
                    this.lastPage();
                } else if (target.id === 'page') {
                    this.goPage(parseInt(target.innerHTML));
                } else {
                    return;
                }
                this.renderPages();
                this.options.callback &&
                    this.options.callback({
                        curr: this.pageNumber,
                        limit: this.options.limit,
                        isFirst: false,
                    });
                this.pageHash();
            }
        });
    }

    pageHash() {
        if (this.options.hash) {
            window.location.hash = '#!' + this.options.hash + '=' + this.pageNumber;
        }
    }

    renderPages() {
        this.pageElement.innerHTML = '';
        if (this.options.ellipsis) {
            this.pageElement.appendChild(this.renderEllipsis());
        } else {
            this.pageElement.appendChild(this.renderNoEllipsis());
        }
    }

    renderNoEllipsis() {
        let fragment = document.createDocumentFragment();
        if (this.pageNumber < this.options.pageShow + 1) {
            fragment.appendChild(this.renderDom(1, this.options.pageShow * 2 + 1));
        } else if (this.pageNumber > this.pageCount - this.options.pageShow) {
            fragment.appendChild(
                this.renderDom(
                    this.pageCount - this.options.pageShow * 2,
                    this.pageCount,
                ),
            );
        } else {
            fragment.appendChild(
                this.renderDom(
                    this.pageNumber - this.options.pageShow,
                    this.pageNumber + this.options.pageShow,
                ),
            );
        }
        if (this.pageNumber > 1) {
            this.addFragmentBefore(fragment, [
                Pagination.PAGE_INFOS[0],
                Pagination.PAGE_INFOS[1],
            ]);
        }
        if (this.pageNumber < this.pageCount) {
            this.addFragmentAfter(fragment, [
                Pagination.PAGE_INFOS[2],
                Pagination.PAGE_INFOS[3],
            ]);
        }
        return fragment;
    }

    renderEllipsis() {
        let fragment = document.createDocumentFragment();
        this.addFragmentAfter(fragment, [
            this.getPageInfos(
                Pagination.CLASS_NAME.LINK + ' current',
                this.pageNumber,
            ),
        ]);
        for (let i = 1; i <= this.options.pageShow; i++) {
            if (this.pageNumber - i > 1) {
                this.addFragmentBefore(fragment, [
                    this.getPageInfos(Pagination.CLASS_NAME.LINK, this.pageNumber - i),
                ]);
            }
            if (this.pageNumber + i < this.pageCount) {
                this.addFragmentAfter(fragment, [
                    this.getPageInfos(Pagination.CLASS_NAME.LINK, this.pageNumber + i),
                ]);
            }
        }
        if (this.pageNumber - (this.options.pageShow + 1) > 1) {
            this.addFragmentBefore(fragment, [Pagination.PAGE_INFOS[4]]);
        }
        if (this.pageNumber > 1) {
            this.addFragmentBefore(fragment, [
                Pagination.PAGE_INFOS[0],
                Pagination.PAGE_INFOS[1],
                this.getPageInfos(Pagination.CLASS_NAME.LINK, 1),
            ]);
        }
        if (this.pageNumber + this.options.pageShow + 1 < this.pageCount) {
            this.addFragmentAfter(fragment, [Pagination.PAGE_INFOS[4]]);
        }
        if (this.pageNumber < this.pageCount) {
            this.addFragmentAfter(fragment, [
                this.getPageInfos(Pagination.CLASS_NAME.LINK, this.pageCount),
                Pagination.PAGE_INFOS[2],
                Pagination.PAGE_INFOS[3],
            ]);
        }
        return fragment;
    }

    addFragmentBefore(fragment, datas) {
        fragment.insertBefore(this.createHtml(datas), fragment.firstChild);
    }

    addFragmentAfter(fragment, datas) {
        fragment.appendChild(this.createHtml(datas));
    }

    createHtml(elemDatas) {
        let fragment = document.createDocumentFragment();
        let liEle = document.createElement('li');
        let aEle = document.createElement('a');
        elemDatas.forEach((elementData, index) => {
            liEle = liEle.cloneNode(false);
            aEle = aEle.cloneNode(false);
            liEle.setAttribute('class', Pagination.CLASS_NAME.ITEM);
            aEle.setAttribute('href', 'javascript:;');
            aEle.setAttribute('id', elementData.id);
            if (elementData.id !== 'page') {
                aEle.setAttribute('class', Pagination.CLASS_NAME.LINK);
            } else {
                aEle.setAttribute('class', elementData.className);
            }
            aEle.innerHTML = elementData.content;
            liEle.appendChild(aEle);
            fragment.appendChild(liEle);
        });
        return fragment;
    }

    renderDom(begin, end) {
        let fragment = document.createDocumentFragment();
        let str = '';
        for (let i = begin; i <= end; i++) {
            str =
                this.pageNumber === i ?
                Pagination.CLASS_NAME.LINK + ' current' :
                Pagination.CLASS_NAME.LINK;
            this.addFragmentAfter(fragment, [this.getPageInfos(str, i)]);
        }
        return fragment;
    }

    prevPage() {
        this.pageNumber--;
    }

    nextPage() {
        this.pageNumber++;
    }

    goPage(pageNumber) {
        this.pageNumber = pageNumber;
    }

    firstPage() {
        this.pageNumber = 1;
    }

    lastPage() {
        this.pageNumber = this.pageCount;
    }

    init(selector) {
        // 分页器元素
        this.pageElement = this.$(selector)[0];
        // 数据总数
        this.dataCount = this.options.count;
        // 当前页码
        this.pageNumber = this.options.curr;
        // 总页数
        this.pageCount = Math.ceil(this.options.count / this.options.limit);
        // 渲染
        this.renderPages();
        // 执行回调函数
        this.options.callback &&
            this.options.callback({
                curr: this.pageNumber,
                limit: this.options.limit,
                isFirst: true,
            });
        // 改变页数并触发事件
        this.changePage();
    }
}

export default Pagination;

/*
// 分页元素ID（必填）
var selector = '#pagelist';

// 分页配置
var pageOption = {
  // 每页显示数据条数（必填）
  limit: 5,
  // 数据总数（一般通过后端获取，必填）
  count: 162,
  // 当前页码（选填，默认为1）
  curr: 1,
  // 是否显示省略号（选填，默认显示）
  ellipsis: true,
  // 当前页前后两边可显示的页码个数（选填，默认为2）
  pageShow: 2,
  // 开启location.hash，并自定义hash值 （默认关闭）
  // 如果开启，在触发分页时，会自动对url追加：#!hash值={curr} 利用这个，可以在页面载入时就定位到指定页
  hash: false,
  // 页面加载后默认执行一次，然后当分页被切换时再次触发
  callback: function(obj) {
    // obj.curr：获取当前页码
    // obj.limit：获取每页显示数据条数
    // obj.isFirst：是否首次加载页面，一般用于初始加载的判断

    // 首次不执行
    if (!obj.isFirst) {
      // do something
    }
  }
};

// 初始化分页器
new Pagination(selector, pageOption);
 */