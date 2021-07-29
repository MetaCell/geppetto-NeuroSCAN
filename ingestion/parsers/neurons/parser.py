from ingestion.parsers.common.pipeline_reader import PipelineReader

# HEADER = ['name', 'metadata', 'timepoints', 'files', 'wormatlas', 'lineage', 'location']
# PREFIX_URL = 'https://www.wormatlas.org/neurons/Individual%20Neurons/'
#
#
# def get_obj_data():
#     obj_parser = FilenameParser(Config('filename_config.json').get_config())
#     obj_parser.parse()
#     return obj_parser.get_data()
#
#
# def get_xlsx_data():
#     xlsx_parser1 = SpreadsheetParser(Config('xlsx_config.json').get_config())
#     xlsx_parser1.parse()
#     xlsx_parser2 = SpreadsheetParser(Config('xlsx_config2.json').get_config())
#     xlsx_parser2.parse()
#     return merge_dict(xlsx_parser1.get_data(), xlsx_parser2.get_data())
#
#
# def get_web_data():
#     config = Config('web_config.json').get_config()
#     source = config.url
#     web_parser = WebParser(config)
#     web_parser.parse()
#     data = web_parser.get_data()
#     for entry in data:
#         data[entry][source]['wormatlas'] = PREFIX_URL + data[entry][source]['wormatlas']
#     return data


def main():
    pipeline = PipelineReader('pipeline.yaml')
    pipeline.start()
    #merged_data = merge_dict(get_web_data(), merge_dict(get_obj_data(), get_xlsx_data()), only_update=True)
    #DataExporter(merged_data).to_csv(output_file='neurons.csv', headers=HEADER)


if __name__ == '__main__':
    main()
