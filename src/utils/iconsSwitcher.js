import {
    JavaScript,
    Html,
    TypeScript,
    Php,
    Python,
    Css,
    Kotlin,
    Vue,
    Swift,
} from "../components/Icons/"

export const switchIcon = (lang) => {
    switch (lang) {
        case 'JavaScript':
            return <JavaScript />;
        case 'HTML':
            return <Html />;
        case 'CSS':
            return <Css />;
        case 'TypeScript':
            return <TypeScript />;
        case 'PHP':
            return <Php />;
        case 'Python':
            return <Python />;
        case 'Kotlin':
            return <Kotlin />;
        case 'Vue':
            return <Vue />;
        case 'Swift':
            return <Swift />;
        default:
            return `${lang ? lang : "Other"}`
    }
};
