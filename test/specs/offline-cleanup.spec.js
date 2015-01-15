beforeEach(function () {
    var ctx = this;
    this.reqs = [];
    this.delete = sinon.stub( indexedDB, "deleteDatabase", function () {
        var ret = {};
        ctx.reqs.push( ret );
        return ret;
    });
});

afterEach(function () {
    this.delete.restore();
    offlineCleanup.dbs.splice( 0 );
});

it( "should store DB names when they're opened", function () {
    indexedDB.open( "foo" );
    indexedDB.open( "bar" );
    expect( offlineCleanup.dbs ).to.have.members([ "foo", "bar" ]);
});

it( "should delete all DBs", function () {
    indexedDB.open( "foo" );
    indexedDB.open( "bar" );
    offlineCleanup();

    expect( this.delete ).to.have.been.calledTwice;
});

it( "should clear localStorage before finishing", function () {
    localStorage.foo = "bar";
    indexedDB.open( "foo" );
    indexedDB.open( "bar" );
    offlineCleanup();

    this.reqs[ 0 ].onsuccess();
    expect( localStorage ).to.have.property( "foo" );

    this.reqs[ 1 ].onsuccess();
    expect( localStorage ).to.not.have.property( "foo" );
});

it( "should invoke callback when finished", function () {
    var spy = sinon.spy();

    indexedDB.open( "foo" );
    offlineCleanup( spy );

    this.reqs[ 0 ].onsuccess();
    expect( spy ).to.have.been.called;
});

it( "should invoke callback when no DBs exist", function () {
    var spy = sinon.spy();
    offlineCleanup( spy );
    expect( spy ).to.have.been.called;
});

it( "should invoke callback when there's an error", function () {
    var spy = sinon.spy();
    var err = {};

    indexedDB.open( "foo" );
    offlineCleanup( spy );

    this.reqs[ 0 ].onerror( err );
    expect( spy ).to.have.been.calledWith( err );
});

it( "should not invoke callback again when there's an error", function () {
    var spy = sinon.spy();
    var err = {};

    indexedDB.open( "foo" );
    indexedDB.open( "bar" );
    offlineCleanup( spy );

    this.reqs[ 0 ].onerror( err );
    this.reqs[ 1 ].onsuccess();

    expect( spy ).to.have.been.calledOnce;
    expect( spy ).to.have.been.calledWith( err );
});