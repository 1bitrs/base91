### base91编码与解码
### Base91 encode and decode
### 修改自Joachim Henke的php代码，查看 http://base91.sourceforge.net/
### Modified from Joachim Henke's php code, see at http://base91.sourceforge.net/
### 使用例 | How to use
```javascript
base91Encode("abcdefgHIJKLMN0123456789!@$%^&*()-=<>?:{}");
// return "#G(Ic,5p(5qOdwQb?texAkZdx2G?*NyWqOa16dvz{0&_t[rU`]D"

base91decode("#G(Ic,5p(5qOdwQb?texAkZdx2G?*NyWqOa16dvz{0&_t[rU`]D")
// return "abcdefgHIJKLMN0123456789!@$%^&*()-=<>?:{}"
```
