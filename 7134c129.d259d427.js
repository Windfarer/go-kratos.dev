(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{83:function(r,e,o){"use strict";o.r(e),o.d(e,"frontMatter",(function(){return a})),o.d(e,"metadata",(function(){return i})),o.d(e,"toc",(function(){return c})),o.d(e,"default",(function(){return d}));var t=o(3),n=o(7),s=(o(0),o(101)),a={id:"api-errors",title:"APIs \u9519\u8bef\u7801\u89c4\u8303\u5b9a\u4e49"},i={unversionedId:"guide/api-errors",id:"guide/api-errors",isDocsHomePage:!1,title:"APIs \u9519\u8bef\u7801\u89c4\u8303\u5b9a\u4e49",description:"APIs \u9519\u8bef\u7801\u53ef\u4ee5\u7edf\u4e00\u901a\u8fc7 proto \u5b9a\u4e49\uff0c\u7136\u540e\u901a\u8fc7 protoc-gen-go-errors \u751f\u6210\u5224\u5b9a\u4ee3\u7801\u3002",source:"@site/docs/guide/api-errors.md",slug:"/guide/api-errors",permalink:"/docs/guide/api-errors",editUrl:"https://github.com/go-kratos/go-kratos.dev/edit/main/docs/guide/api-errors.md",version:"current",sidebar:"docs",previous:{title:"APIs \u63a5\u53e3\u89c4\u8303\u5b9a\u4e49",permalink:"/docs/guide/api-protobuf"}},c=[{value:"\u5b89\u88c5",id:"\u5b89\u88c5",children:[]},{value:"Errors \u5b9a\u4e49",id:"errors-\u5b9a\u4e49",children:[]},{value:"Errors \u751f\u6210",id:"errors-\u751f\u6210",children:[]}],p={toc:c};function d(r){var e=r.components,o=Object(n.a)(r,["components"]);return Object(s.b)("wrapper",Object(t.a)({},p,o,{components:e,mdxType:"MDXLayout"}),Object(s.b)("p",null,"APIs \u9519\u8bef\u7801\u53ef\u4ee5\u7edf\u4e00\u901a\u8fc7 proto \u5b9a\u4e49\uff0c\u7136\u540e\u901a\u8fc7 protoc-gen-go-errors \u751f\u6210\u5224\u5b9a\u4ee3\u7801\u3002"),Object(s.b)("h3",{id:"\u5b89\u88c5"},"\u5b89\u88c5"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{}),"go get github.com/go-kratos/kratos/cmd/protoc-gen-go-errors\n")),Object(s.b)("h3",{id:"errors-\u5b9a\u4e49"},"Errors \u5b9a\u4e49"),Object(s.b)("p",null,"api/helloworld/errors/helloworld.proto"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-protobuf"}),'syntax = "proto3";\n\npackage kratos.demo.errors;\n\nimport "kratos/api/annotations.proto";\n\n// \u591a\u8bed\u8a00\u7279\u5b9a\u5305\u540d\uff0c\u7528\u4e8e\u6e90\u4ee3\u7801\u5f15\u7528\noption go_package = "github.com/go-kratos/kratos/demo/errors;errors";\noption java_multiple_files = true;\noption java_package = "com.github.kratos.demo.errors";\noption objc_class_prefix = "KratosDemoErrors";\n\nenum Helloworld {\n    option (kratos.api.errors) = true;\n\n    MissingName = 0;\n}\n')),Object(s.b)("h3",{id:"errors-\u751f\u6210"},"Errors \u751f\u6210"),Object(s.b)("p",null,"\u901a\u8fc7 proto \u751f\u6210\u5bf9\u5e94\u7684\u4ee3\u7801\uff1a"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{}),"make proto\n")),Object(s.b)("p",null,"Source:"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{}),'const (\n    Errors_MissingName = "Helloworld_MissingName"\n)\n\nfunc IsMissingName(err error) bool {\n    return errors.Reason(err) == Errors_MissingName\n}\n')))}d.isMDXComponent=!0}}]);