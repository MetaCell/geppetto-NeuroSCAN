import requests
from bs4 import BeautifulSoup
import csv


def link_to_csv(link, csv_filename):
    response = requests.get(link)
    response.raise_for_status()  # Raise an error if the request was not successful

    html_content = response.text
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find all rows in the table
    rows = soup.find('table').find_all('tr')[1:]  # [1:] to skip the header row

    # Extract the desired data from each row
    data = []
    for row in rows:
        anchor = row.find('a')
        if anchor:
            neuron_name = anchor.text
            href = "https://www.wormatlas.org/neurons/Individual%20Neurons/" + anchor['href']
            data.append([neuron_name, href])

    # Write the data to a CSV file
    with open(csv_filename, 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(["Neuron", "URL"])  # Write header
        writer.writerows(data)


if __name__ == '__main__':
    link = 'https://www.wormatlas.org/neurons/Individual%20Neurons/Neuronframeset.html'
    link_to_csv(link, 'neuron_wormatlas_mapper.csv')
