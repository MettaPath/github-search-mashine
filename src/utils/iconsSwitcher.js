import {
    JavaScript,
    Html,
    TypeScript,
    Php,
    Python,
    Css
} from "../components/Icons/"

export const switchIcon = (lang) => {
    switch (lang) {
        case 'JavaScript':
            return <JavaScript />;
        case 'HTML':
            return <Html />;
        case 'TypeScript':
            return <TypeScript />;
        case 'PHP':
            return <Php />;
        case 'Python':
            return <Python />;
        case 'CSS':
            return <Css />;
        default:
            return `${lang ? lang : "Other"}`
    }
}
