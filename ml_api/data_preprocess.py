import pandas as pd
from sklearn.experimental import enable_iterative_imputer # enable_iterative_imputer must be above IterativeImputer to work
from sklearn.impute import KNNImputer, IterativeImputer
from sklearn.preprocessing import MinMaxScaler, StandardScaler, normalize, FunctionTransformer
from sklearn.pipeline import Pipeline
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split

def data_preprocess(df):
    #KNN Imputation
    imputer_knn = KNNImputer(n_neighbors=5, weights='uniform')
    df_imputed_knn = imputer_knn.fit_transform(df.drop(columns='date'))
    df_imputed_knn = pd.DataFrame(df_imputed_knn, columns=df.drop(columns='date').columns)


    # Multivariate Imputation by Chained Equations (MICE)
    # NOTE: MICE seems too sus
    # imputer_mice = IterativeImputer
    # df_imputed_mice = imputer_mice().fit_transform(df.drop(columns='date'))
    # df_imputed_mice = pd.DataFrame(df_imputed_mice, columns=df.drop(columns='date').columns)

    # Randomize data
    shuffle_knn = shuffle(df_imputed_knn, random_state=42)
    # shuffle_mice = shuffle(df_imputed_mice, random_state=42)

    # Pipeline of preprocessing
    pipeline = Pipeline([
        ('minmax', MinMaxScaler()), 
        ('normalize', FunctionTransformer(normalize, validate=False)),
        ('standard', StandardScaler())
        ])

    knn_imputed_pipeline = pipeline.fit_transform(shuffle_knn)
    # mice_imputed_pipeline = pipeline.fit_transform(shuffle_mice)

    df_imputed_knn_transformed = pd.DataFrame(knn_imputed_pipeline, columns=df.drop(columns=['date']).columns)
    # df_imputed_mice_transformed = pd.DataFrame(mice_imputed_pipeline, columns=df.drop(columns=['date']).columns)

    X_knn = df_imputed_knn_transformed.drop(columns=['PriceUSD'])
    y_knn = df_imputed_knn_transformed['PriceUSD']
    # X_mice = df_imputed_mice_transformed.drop(columns=['PriceUSD'])
    # y_mice = df_imputed_mice_transformed['PriceUSD']

    X_knn_train, X_knn_test, y_knn_train, y_knn_test = train_test_split(X_knn, y_knn, test_size=0.2, random_state=42)
    # X_mice_train, X_mice_test, y_mice_train, y_mice_test = train_test_split(X_mice, y_mice, test_size=0.2, random_state=42)
    return X_knn_train, X_knn_test, y_knn_train, y_knn_test