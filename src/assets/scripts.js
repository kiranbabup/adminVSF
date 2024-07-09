export function formatTimestamp(timestamp) {
    let date = new Date(timestamp);
    let day = date.getDate().toString().padStart(2, '0'); 
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    let year = date.getFullYear();
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    let formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateCame = date.toISOString().split('T')[0];
    const [year, month, day] = dateCame.split('-');
          return `${day}-${month}-${year}`;
  };
export const convertDateFormat = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
};