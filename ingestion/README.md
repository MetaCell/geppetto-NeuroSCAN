# Ingestion

The `ingestall.py` script is designed to parse and process datasets and load data into a SQLite database. The script offers several command-line flags for customization:

### Command-line Flags

- **`--root-dir`**
   - **Description**: Specifies the path to the directory containing the datasets to be ingested.
   - **Type**: String
   - **Required**: Yes

- **`--dry-run`**
   - **Description**: If set, the script will undergo all processing steps except for the data ingestion into the SQLite database. Useful for validating and testing the dataset without making actual changes to the database.
   - **Type**: Flag
   - **Required**: No
   - **Default**: False

- **`--transform`**
   - **Description**: If set, the script will perform additional transformation tasks, specifically zipping the cphates datasets and converting AVI files to MP4 format.
   - **Type**: Flag
   - **Required**: No
   - **Default**: False

- **`--output-dir`**
   - **Description**: Specifies the directory where output files, such as logs and exported data, should be saved. If the directory doesn't exist, the script will create it.
   - **Type**: String
   - **Required**: No
   - **Default**: 'output'

- **`--db-path`**
   - **Description**: Specifies the path to the SQLite database file where data will be ingested. If the script is run with the `--dry-run` flag, this database won't be modified.
   - **Type**: String
   - **Required**: No
   - **Default**: '../../applications/neuroscan/backend/.tmp/data.db'

## Dataset Validation

1. Go back to the root directory and install the necessary packages:

 ```
cd ..
pip install -e .
```

2. Run the ingestall script with the appropriate arguments:

```
cd ingestion
python ingestall.py --root-dir /path/to/dataset --dry-run --output-dir /path/to/output 
```