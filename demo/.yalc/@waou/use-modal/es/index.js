import React, { createContext, memo, useContext, useState, useMemo, useRef, useEffect } from 'react';

/* eslint-disable @typescript-eslint/no-empty-function */
var eo = {};
var ea = [];
var noop = function () { };
var MODAL_TYPE;
(function (MODAL_TYPE) {
    MODAL_TYPE["MODAL"] = "modal";
    MODAL_TYPE["SIDE_SHEET"] = "sideSheet";
})(MODAL_TYPE || (MODAL_TYPE = {}));

var ModalContext = createContext({
    init: false,
    config: null,
    modalStoreRef: { current: [] },
    setVisibleIds: noop,
    updateAndSaveModal: noop,
    destroyById: noop,
    interceptor: eo,
    loadingField: undefined
});
var ModalInsContext = createContext({
    setModalProps: noop,
    onResolve: noop,
    onReject: noop
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var RenderModal = function (props) {
    var modalId = props.modalId, type = props.type, resolve = props.resolve, reject = props.reject, visibleIds = props.visibleIds, modalProps = props.modalProps, children = props.children;
    var config = useContext(ModalContext).config;
    var _a = useContext(ModalContext), setVisibleIds = _a.setVisibleIds, loadingField = _a.loadingField;
    var _b = useState(modalProps), injectModalProps = _b[0], setModalProps = _b[1];
    var ModalComponent = config[type];
    var onClose = function () {
        setVisibleIds(function (beforeVids) { return beforeVids.filter(function (id) { return id !== modalId; }); });
    };
    var onResolve = function (value) {
        resolve(value);
        onClose();
    };
    var onReject = function (e) {
        reject(e);
        onClose();
    };
    var ModalInsContextValue = useMemo(function () { return ({
        setModalProps: setModalProps,
        onResolve: onResolve,
        onReject: onReject
    }); }, []);
    var onOk = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (loadingField) {
                        setModalProps(function (state) {
                            var _a;
                            return (__assign(__assign({}, state), (_a = {}, _a[loadingField] = true, _a)));
                        });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, (injectModalProps === null || injectModalProps === void 0 ? void 0 : injectModalProps.onOk())];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    if (loadingField) {
                        setModalProps(function (state) {
                            var _a;
                            return (__assign(__assign({}, state), (_a = {}, _a[loadingField] = false, _a)));
                        });
                    }
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(ModalComponent, __assign({ visible: visibleIds.includes(modalId), onCancel: onReject }, injectModalProps, { onOk: onOk }),
        React.createElement(ModalInsContext.Provider, { value: ModalInsContextValue }, children)));
};
var Portal = memo(function (props) {
    var visibleIds = props.visibleIds;
    var modalStoreRef = useContext(ModalContext).modalStoreRef;
    return (React.createElement(React.Fragment, null, modalStoreRef.current.map(function (modalInstance, idx) {
        var Component = modalInstance.Component, componentProps = modalInstance.props;
        var _a = componentProps || {}, modalProps = _a.modalProps, insProps = __rest(_a, ["modalProps"]);
        return (React.createElement(RenderModal, __assign({ key: idx }, modalInstance, { visibleIds: visibleIds, modalProps: modalProps }),
            React.createElement(Component, __assign({}, insProps))));
    })));
});

var updateAndSaveModal = function (modalStoreRef) {
    return function (instance) {
        var hasInstance = modalStoreRef.current.find(function (ins) { return ins.modalId === instance.modalId; });
        if (hasInstance) {
            modalStoreRef.current = modalStoreRef.current.map(function (oldIns) {
                if (oldIns.modalId === instance.modalId) {
                    return __assign(__assign({}, instance), { props: __assign(__assign({}, oldIns.props), instance.props) });
                }
                return oldIns;
            });
        }
        else {
            modalStoreRef.current = __spreadArray(__spreadArray([], modalStoreRef.current, true), [instance], false);
        }
        return function () {
            modalStoreRef.current.filter(function (ins) { return ins.modalId !== instance.modalId; });
        };
    };
};

var ModalProvider = memo(function (props) {
    var modal = props.modal, sideSheet = props.sideSheet, loadingField = props.loadingField, _a = props.interceptor, interceptor = _a === void 0 ? eo : _a, children = props.children;
    var _b = useState([]), visibleIds = _b[0], setVisibleIds = _b[1];
    // context link
    var config = useContext(ModalContext).config;
    var modalConfig = useMemo(function () {
        if (!modal || !sideSheet) {
            return config;
        }
        return { modal: modal, sideSheet: sideSheet };
    }, [modal, sideSheet, config]);
    var modalStoreRef = useRef([]);
    var destroyById = function (modalId) {
        modalStoreRef.current = modalStoreRef.current.filter(function (mins) { return mins.modalId !== modalId; });
    };
    var contextValue = useMemo(function () { return ({
        init: true,
        config: modalConfig,
        interceptor: interceptor,
        loadingField: loadingField,
        modalStoreRef: modalStoreRef,
        setVisibleIds: setVisibleIds,
        destroyById: destroyById,
        updateAndSaveModal: updateAndSaveModal(modalStoreRef)
    }); }, [modalConfig]);
    return (React.createElement(ModalContext.Provider, { value: contextValue },
        children,
        React.createElement(Portal, { visibleIds: visibleIds })));
});
ModalProvider.displayName = 'ModalProvider';

var useInjectProps = function () {
    var _a = useContext(ModalInsContext), setModalProps = _a.setModalProps, otherProps = __rest(_a, ["setModalProps"]);
    return __assign(__assign({}, otherProps), { setModalProps: (setModalProps) });
};

/* eslint-disable react-hooks/rules-of-hooks */
var useModalId = function (context) {
    var _a;
    var modalStoreRef = useContext(ModalContext).modalStoreRef;
    if (typeof context === 'string') {
        var component = (_a = modalStoreRef.current.find(function (ins) { return ins.modalId === context; })) === null || _a === void 0 ? void 0 : _a.Component;
        if (!component) {
            throw new Error("useModal: Please check this name [".concat(context, "], Are you registered?"));
        }
        return {
            modalId: context,
            component: component
        };
    }
    else {
        return {
            modalId: useMemo(function () { return Symbol('useModal_id'); }, []),
            component: context
        };
    }
};

var useUpdateAndSaveModal = function (type, component, props, deps) {
    var _a = useContext(ModalContext), setVisibleIds = _a.setVisibleIds, updateAndSaveModal = _a.updateAndSaveModal, destroyById = _a.destroyById;
    var _b = useModalId(component), modalId = _b.modalId, functionComponent = _b.component;
    var currentModalProps = {
        type: type,
        modalId: modalId,
        Component: functionComponent,
        props: props
    };
    // update
    useMemo(function () {
        return updateAndSaveModal(__assign(__assign({}, currentModalProps), { resolve: noop, reject: noop, props: props }));
    }, deps);
    // update
    useEffect(function () {
        setVisibleIds(function (beforeVids) {
            return beforeVids.includes(modalId) ? __spreadArray([], beforeVids, true) : beforeVids;
        });
    }, deps);
    // destroy
    useEffect(function () { return function () {
        if (typeof modalId !== 'string') {
            destroyById(modalId);
        }
    }; }, [modalId]);
    var dispatch = function (visible, dispatchProps) {
        return new Promise(function (resolve, reject) {
            var _a;
            updateAndSaveModal(__assign(__assign({}, currentModalProps), { resolve: resolve, reject: reject, props: __assign(__assign(__assign({}, currentModalProps.props), dispatchProps), { modalProps: __assign(__assign({}, (_a = currentModalProps.props) === null || _a === void 0 ? void 0 : _a.modalProps), dispatchProps === null || dispatchProps === void 0 ? void 0 : dispatchProps.modalProps) }) }));
            // hide
            if (!visible) {
                setVisibleIds(function (beforeVids) { return beforeVids.filter(function (id) { return id !== modalId; }); });
                return;
            }
            // show and update
            setVisibleIds(function (beforeVids) {
                return beforeVids.includes(modalId)
                    ? __spreadArray([], beforeVids, true) : __spreadArray(__spreadArray([], beforeVids, true), [modalId], false);
            });
        });
    };
    return dispatch;
};

/* eslint-disable react-hooks/rules-of-hooks */
var createModalHook = function (type) {
    var useModal = function (component, props, deps) {
        if (deps === void 0) { deps = ea; }
        var init = useContext(ModalContext).init;
        if (!init) {
            throw new Error("useModal !\n      please use the ModalProvider to init!\n      like this: <ModalProvider modal={Modal} sideSheet={sideSheet}>{children}</ModalProvider>\n    ");
        }
        var dispatch = useUpdateAndSaveModal(type, component, props, deps);
        return [dispatch];
    };
    useModal.useRegister = function (modalId, Component) {
        var _a = useContext(ModalContext), init = _a.init, updateAndSaveModal = _a.updateAndSaveModal, destroyById = _a.destroyById;
        if (!init) {
            throw new Error("useModal !\n    please use the ModalProvider to init!\n    like this: <ModalProvider modal={Modal} sideSheet={sideSheet}>{children}</ModalProvider>\n  ");
        }
        useMemo(function () {
            updateAndSaveModal({
                type: type,
                modalId: modalId,
                Component: Component,
                props: eo,
                reject: noop,
                resolve: noop
            });
        }, []);
        useEffect(function () { return function () {
            destroyById(modalId);
        }; }, []);
    };
    return useModal;
};

export { MODAL_TYPE, ModalProvider, createModalHook, useInjectProps };
