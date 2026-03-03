package storage

import (
	"bytes"
	"context"

	"github.com/ayosafacundo/AstroForge/internal/config"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type Minio struct {
	Client *minio.Client
	Bucket string
}

func NewMinio(cfg config.MinioConfig) *Minio {

	client, err := minio.New(cfg.Endpoint, &minio.Options{
		Creds: credentials.NewStaticV4(
			cfg.AccessKey,
			cfg.SecretKey,
			"",
		),
		Secure: false,
	})

	if err != nil {
		panic(err)
	}

	return &Minio{
		Client: client,
		Bucket: cfg.Bucket,
	}
}

func (m *Minio) Upload(
	ctx context.Context,
	objectName string,
	data []byte,
) error {

	_, err := m.Client.PutObject(
		ctx,
		m.Bucket,
		objectName,
		bytes.NewReader(data),
		int64(len(data)),
		minio.PutObjectOptions{},
	)

	return err
}
