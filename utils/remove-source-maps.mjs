import glob from 'glob';
import {readFileSync, unlinkSync, writeFileSync} from 'node:fs';


glob('dist/**/*.map', (err, matches) => {
    if (err) throw err;
    matches.forEach(file => unlinkSync(file));
});

glob('dist/**/*.+(css|js)', (err, matches) => {
    if (err) throw err;
    matches.forEach(file => {
        const data = readFileSync(file, {encoding: 'utf8'});
        const res = data.replace(/\/[*|\/]# sourceMappingURL=.+\n/, '');
        writeFileSync(file, res);
    });
});
