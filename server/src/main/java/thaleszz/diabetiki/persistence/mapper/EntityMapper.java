package thaleszz.diabetiki.persistence.mapper;

public interface EntityMapper<D, M> {
    M toModel(D domain);

    M toModel(M model, D domain);

    D toDomain(M model);

    D toDomain(D domain, M model);
}
